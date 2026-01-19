"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, FolderOpen, Camera, Loader2 } from "lucide-react";
import { Header } from "@/components/layout";
import {
  ContactListItem,
  AddFriendBanner,
  FriendRequestItem,
  SearchResultCard,
} from "@/components/contact";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import {
  useContacts,
  useContactRequests,
  useSearchContact,
  useAddContact,
  useApproveContact,
  useRejectContact,
} from "@/hooks/use-contact";

type ViewMode = "contacts" | "addFriend";
type RequestTab = "incoming" | "outgoing";
type PageMode = "contact" | "transfer";

export default function ContactPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();

  // Determine page mode from query param
  const pageMode: PageMode = searchParams.get("mode") === "transfer" ? "transfer" : "contact";
  const isTransferMode = pageMode === "transfer";

  const [viewMode, setViewMode] = useState<ViewMode>("contacts");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [requestTab, setRequestTab] = useState<RequestTab>("incoming");

  // Fetch contacts
  const { data: contactsData, isLoading: isLoadingContacts } = useContacts({
    enabled: isAuthenticated,
  });

  // Fetch contact requests (only when in addFriend view)
  const { data: requestsData, isLoading: isLoadingRequests } = useContactRequests({
    enabled: isAuthenticated && viewMode === "addFriend",
  });

  // Search for contacts - only when searchQuery is set (on Enter press)
  const { data: searchData, isLoading: isSearching } = useSearchContact(searchQuery, {
    enabled: isAuthenticated && viewMode === "addFriend" && searchQuery.length > 0,
  });

  // Handle search on Enter key
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && viewMode === "addFriend") {
      setSearchQuery(searchInput);
    }
  };

  // Mutations
  const addContact = useAddContact();
  const approveContact = useApproveContact();
  const rejectContact = useRejectContact();

  // Get contacts and filter by search in contacts view (local filtering uses searchInput)
  const filteredContacts = useMemo(() => {
    const contacts = contactsData?.Contacts ?? [];
    if (viewMode !== "contacts") return contacts;
    if (!searchInput) return contacts;
    return contacts.filter((contact) =>
      contact.Alias.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [contactsData?.Contacts, searchInput, viewMode]);

  // Group contacts alphabetically by Letter field
  const groupedContacts = useMemo(() => {
    const groups: Record<string, typeof filteredContacts> = {};

    filteredContacts.forEach((contact) => {
      const letter = contact.Letter.toUpperCase();
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(contact);
    });

    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredContacts]);

  // Get friend requests
  const friendRequests = requestsData?.FrRequests ?? [];
  const myRequests = requestsData?.MyRequests ?? [];

  // Get search results
  const searchResults = searchData?.Contacts ?? [];

  const handleContactClick = (contactId: string, targetId: string) => {
    if (isTransferMode) {
      // In transfer mode, go to transfer page with target ID
      router.push(`/transfer?id=${targetId}`);
    } else {
      // In contact mode, go to contact detail page
      router.push(`/account/contact/${contactId}`);
    }
  };

  const handleApproveRequest = async (requestId: string) => {
    try {
      await approveContact.mutateAsync({ Id: requestId });
    } catch (error) {
      console.error("Failed to approve request:", error);
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await rejectContact.mutateAsync({ Id: requestId });
    } catch (error) {
      console.error("Failed to reject request:", error);
    }
  };

  const handleCancelRequest = async (requestId: string) => {
    // Cancel is same as reject for outgoing requests
    try {
      await rejectContact.mutateAsync({ Id: requestId });
    } catch (error) {
      console.error("Failed to cancel request:", error);
    }
  };

  const handleAddFriend = async (userId: string) => {
    try {
      const response = await addContact.mutateAsync({ Id: userId });
      if (response.Code === 0) {
        // Clear search after successful request
        setSearchInput("");
        setSearchQuery("");
      }
    } catch (error) {
      console.error("Failed to add friend:", error);
    }
  };

  const totalPendingRequests = friendRequests.length + myRequests.length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header
          variant="subpage"
          title={isTransferMode ? "Transfer" : "My Contact"}
          backHref="/account"
        />
        <div className="flex-1 flex items-center justify-center px-4">
          <p className="text-sm text-zinc-500 text-center">
            Please login to access this page
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header
        variant="subpage"
        title={isTransferMode ? "Transfer" : "My Contact"}
        backHref={isTransferMode ? "/account" : "/account"}
      />

      {/* Add New Friend Banner - only in contacts view and not in transfer mode */}
      {viewMode === "contacts" && !isTransferMode && (
        <AddFriendBanner
          requestCount={totalPendingRequests}
          onClick={() => setViewMode("addFriend")}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder={viewMode === "addFriend" ? "Search UID (press Enter)" : "Search UID"}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="w-full pl-12 pr-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
            />
            {viewMode === "addFriend" && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button className="text-zinc-400 hover:text-zinc-600">
                  <FolderOpen className="w-5 h-5" />
                </button>
                <button className="text-zinc-400 hover:text-zinc-600">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {viewMode === "contacts" ? (
          /* Contacts List View */
          <div>
            {isLoadingContacts ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : groupedContacts.length > 0 ? (
              groupedContacts.map(([letter, letterContacts]) => (
                <div key={letter}>
                  {/* Letter Header */}
                  <div className="px-4 py-2 bg-zinc-50 border-y border-zinc-200">
                    <span className="text-sm font-roboto-semibold text-zinc-600">{letter}</span>
                  </div>
                  {/* Contact Items */}
                  {letterContacts.map((contact) => (
                    <ContactListItem
                      key={contact.Id}
                      username={contact.Alias}
                      avatar={contact.Image}
                      onClick={() => handleContactClick(contact.Id, contact.Id)}
                    />
                  ))}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
                <p>No contacts found</p>
              </div>
            )}
          </div>
        ) : (
          /* Add Friend View */
          <div className="px-4">
            {/* Search Result */}
            {searchQuery && (
              <div className="mb-4">
                {isSearching ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <SearchResultCard
                      key={result.Id}
                      username={result.Username}
                      avatar={result.Image}
                      onAdd={() => handleAddFriend(result.Id)}
                      isAdding={addContact.isPending}
                    />
                  ))
                ) : searchData ? (
                  <div className="py-4 text-center text-zinc-500">
                    No users found
                  </div>
                ) : null}
                {addContact.isSuccess && (
                  <p className="text-sm text-primary text-center mt-2">
                    Friend request sent!
                  </p>
                )}
              </div>
            )}

            {/* Request Tabs */}
            <div className="flex border-b border-zinc-200 mb-4">
              <button
                onClick={() => setRequestTab("incoming")}
                className={cn(
                  "flex-1 py-3 text-sm font-roboto-medium transition-colors",
                  requestTab === "incoming"
                    ? "text-primary border-b-2 border-primary"
                    : "text-zinc-500"
                )}
              >
                Friend Request ({friendRequests.length})
              </button>
              <button
                onClick={() => setRequestTab("outgoing")}
                className={cn(
                  "flex-1 py-3 text-sm font-roboto-medium transition-colors",
                  requestTab === "outgoing"
                    ? "text-primary border-b-2 border-primary"
                    : "text-zinc-500"
                )}
              >
                My Request ({myRequests.length})
              </button>
            </div>

            {/* Request List */}
            <div>
              {isLoadingRequests ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                </div>
              ) : requestTab === "incoming" ? (
                friendRequests.length > 0 ? (
                  friendRequests.map((request) => (
                    <FriendRequestItem
                      key={request.Id}
                      username={request.Username}
                      avatar={request.Image}
                      type="incoming"
                      onApprove={() => handleApproveRequest(request.Id)}
                      onReject={() => handleRejectRequest(request.Id)}
                    />
                  ))
                ) : (
                  <div className="py-8 text-center text-zinc-500">
                    No friend requests
                  </div>
                )
              ) : myRequests.length > 0 ? (
                myRequests.map((request) => (
                  <FriendRequestItem
                    key={request.Id}
                    username={request.Username}
                    avatar={request.Image}
                    type="outgoing"
                    onCancel={() => handleCancelRequest(request.Id)}
                  />
                ))
              ) : (
                <div className="py-8 text-center text-zinc-500">
                  No pending requests
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
