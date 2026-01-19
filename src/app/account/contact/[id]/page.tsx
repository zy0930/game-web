"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Pencil, Loader2 } from "lucide-react";
import { Header } from "@/components/layout";
import { useAuth } from "@/providers/auth-provider";
import { useContactDetail, useDeleteContact } from "@/hooks/use-contact";

export default function ContactDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated } = useAuth();

  const contactId = params.id as string;

  const [imgError, setImgError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [alias, setAlias] = useState("");

  // Fetch contact detail
  const { data: contact, isLoading, error } = useContactDetail(contactId, {
    enabled: isAuthenticated && !!contactId,
  });

  // Delete mutation
  const deleteContact = useDeleteContact();

  // Update alias when contact loads
  if (contact?.Alias && !alias && !isEditing) {
    setAlias(contact.Alias);
  }

  const handleTransfer = () => {
    if (contact?.TargetId) {
      // Navigate to transfer page with target ID
      router.push(`/transfer?id=${contact.TargetId}`);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteContact.mutateAsync({ Id: contactId });
      router.push("/account/contact");
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  const handleSaveAlias = () => {
    // TODO: API call to update alias (if API supports it)
    console.log("Saving alias:", alias);
    setIsEditing(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header variant="subpage" title="Friend Detail" backHref="/account/contact" />
        <div className="flex-1 flex items-center justify-center px-4">
          <p className="text-sm text-zinc-500 text-center">
            Please login to access this page
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header variant="subpage" title="Friend Detail" backHref="/account/contact" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !contact) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header variant="subpage" title="Friend Detail" backHref="/account/contact" />
        <div className="flex-1 flex items-center justify-center px-4">
          <p className="text-sm text-red-500 text-center">
            Failed to load contact details
          </p>
        </div>
      </div>
    );
  }

  const displayAlias = alias || contact.Alias || contact.Name;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header variant="subpage" title="Friend Detail" backHref="/account/contact" />

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-zinc-200 mb-4">
            {!imgError && contact.Image ? (
              <Image
                src={contact.Image}
                alt={displayAlias}
                unoptimized
                width={96}
                height={96}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500 font-roboto-bold text-2xl">
                {displayAlias.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Alias with Edit */}
          <div className="flex items-center gap-2 mb-1">
            {isEditing ? (
              <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                onBlur={handleSaveAlias}
                onKeyDown={(e) => e.key === "Enter" && handleSaveAlias()}
                autoFocus
                className="text-xl font-roboto-semibold text-zinc-800 text-center border-b-2 border-primary focus:outline-none bg-transparent"
              />
            ) : (
              <>
                <span className="text-xl font-roboto-semibold text-zinc-800">{displayAlias}</span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-zinc-400 hover:text-zinc-600"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* UID */}
          <span className="text-sm text-zinc-500">UID: {contact.Username}</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleTransfer}
            className="w-full py-4 bg-primary text-white font-roboto-bold text-base rounded-lg hover:bg-primary/90 transition-colors"
          >
            TRANSFER
          </button>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full py-4 bg-red-500 text-white font-roboto-bold text-base rounded-lg hover:bg-red-600 transition-colors"
          >
            DELETE
          </button>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowDeleteConfirm(false)}
          />
          <div className="relative bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-roboto-semibold text-zinc-800 mb-2">Delete Contact</h3>
            <p className="text-zinc-600 mb-6">
              Are you sure you want to delete {displayAlias} from your contacts?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleteContact.isPending}
                className="flex-1 py-3 border border-zinc-300 text-zinc-700 font-roboto-medium rounded-lg hover:bg-zinc-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteContact.isPending}
                className="flex-1 py-3 bg-red-500 text-white font-roboto-medium rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleteContact.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
