'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import TopAppBar from '@/components/TopAppBar';
import ConciergeFAB from '@/components/ConciergeFAB';
import { useRequestForm, type AttachmentItem } from '@/lib/request-context';

export default function RequestStep3Page() {
  const router = useRouter();
  const { formData, updateFormData } = useRequestForm();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: AttachmentItem[] = Array.from(files).map((file) => ({
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type.startsWith('image/') ? 'image' : 'document',
    }));

    updateFormData({
      attachments: [...formData.attachments, ...newAttachments],
    });

    // Reset input so the same file can be re-selected
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function removeAttachment(index: number) {
    const updated = formData.attachments.filter((_, i) => i !== index);
    updateFormData({ attachments: updated });
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <>
      <TopAppBar />

      <main className="pt-20 pb-32 px-4 md:px-8 max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-on-secondary-container">
              Step 3 of 4
            </span>
            <span className="text-xs font-semibold text-on-surface-variant">
              Photos &amp; Documents
            </span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: '75%' }}
            />
          </div>
        </div>

        {/* Section Title */}
        <h1 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-primary tracking-tight mb-2">
          Add supporting files
        </h1>
        <p className="text-on-surface-variant text-sm mb-8">
          Upload photos of the issue, vessel documentation, or any reference
          materials that will help providers assess your request.
        </p>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Upload Area */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-outline-variant/40 rounded-xl p-8 flex flex-col items-center justify-center text-center mb-8 hover:border-primary/40 hover:bg-surface-container-low/50 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-5xl text-outline mb-4">
            cloud_upload
          </span>
          <h3 className="font-semibold text-on-surface text-base mb-1">
            Upload Vessel Media
          </h3>
          <p className="text-on-surface-variant text-xs mb-5 max-w-xs">
            Drag files here or click to browse. Supports JPG, PNG, PDF up to
            25MB each.
          </p>
          <span className="bg-primary text-on-primary px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all active:scale-95 inline-block">
            Select Files
          </span>
        </button>

        {/* Attached Items */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-on-surface mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg text-on-surface-variant">
              attach_file
            </span>
            Attached Items
            <span className="text-xs text-on-surface-variant font-normal">
              ({formData.attachments.length})
            </span>
          </h3>
          {formData.attachments.length === 0 ? (
            <div className="rounded-xl bg-surface-container-low border border-outline-variant/10 p-6 text-center">
              <p className="text-sm text-on-surface-variant">
                No files attached yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {formData.attachments.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center gap-4 bg-surface-container-low rounded-xl p-4 border border-outline-variant/10"
                >
                  {/* Thumbnail / Icon */}
                  {file.type === 'image' ? (
                    <div className="w-14 h-14 rounded-lg bg-surface-container-highest flex-shrink-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-2xl">
                        image
                      </span>
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-primary-fixed flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-2xl">
                        description
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-on-surface truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {file.size}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-all flex-shrink-0"
                  >
                    <span className="material-symbols-outlined text-lg">
                      delete
                    </span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pro Tip */}
        <div className="bg-secondary-fixed border-l-4 border-primary rounded-r-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-xl flex-shrink-0 mt-0.5">
              info
            </span>
            <div>
              <h4 className="text-sm font-bold text-on-secondary-fixed mb-1">
                Pro Tip
              </h4>
              <p className="text-xs text-on-secondary-fixed-variant leading-relaxed">
                Including clear photos of the issue area and relevant vessel
                documentation helps providers deliver more accurate quotes and
                faster turnaround times.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/20">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push('/request/step-2')}
            className="text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            Back
          </button>
          <button
            type="button"
            onClick={() => router.push('/request/step-4')}
            className="bg-primary text-on-primary px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all active:scale-95 flex items-center gap-2"
          >
            Next Step
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </button>
        </div>
        <div className="h-1 bg-gradient-to-r from-primary via-tertiary-fixed to-primary-fixed" />
      </div>

      <ConciergeFAB />
    </>
  );
}
