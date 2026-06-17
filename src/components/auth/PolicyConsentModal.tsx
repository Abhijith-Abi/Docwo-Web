"use client";

import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import getApiData from "@/utils/api-fetch/get-api-data";
import postApiData from "@/utils/api-fetch/post-api-data";
import { Loader2 } from "lucide-react";

interface MissingPolicy {
    policy_id: string;
    policy_type: string;
    version: string;
    title: string;
}

interface PolicyContent {
    title: string;
    content_markdown: string;
    version: string;
    policy_id: string;
}

interface PolicyConsentModalProps {
    missingPolicies: MissingPolicy[];
    onAllConsented: () => void;
}

function markdownToHtml(md: string): string {
    let html = md
        // Escape HTML entities that might be double-encoded
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#x2F;/g, "/")
        .replace(/&#x27;/g, "'")
        // Headers
        .replace(/^### (.+)$/gm, "<h3>$1</h3>")
        .replace(/^## (.+)$/gm, "<h2>$1</h2>")
        .replace(/^# (.+)$/gm, "<h1>$1</h1>")
        // Bold and italic
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        // Unordered list items
        .replace(/^\* (.+)$/gm, "<li>$1</li>")
        // Wrap consecutive <li> in <ul>
        .replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>")
        // Line breaks for paragraphs
        .replace(/\n\n/g, "</p><p>")
        .replace(/\n/g, "<br/>");

    html = `<p>${html}</p>`;
    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/g, "").replace(/<p><br\/><\/p>/g, "");

    return html;
}

export default function PolicyConsentModal({
    missingPolicies,
    onAllConsented,
}: PolicyConsentModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [policyContent, setPolicyContent] = useState<PolicyContent | null>(
        null,
    );
    const [loading, setLoading] = useState(true);
    const [accepted, setAccepted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const currentPolicy = missingPolicies[currentIndex];

    useEffect(() => {
        if (!currentPolicy) return;

        const fetchPolicy = async () => {
            setLoading(true);
            setError(null);
            setAccepted(false);
            try {
                const response = await getApiData(
                    `/legal/${currentPolicy.policy_type}/${currentPolicy.version}`,
                );
                const data = response?.data ?? response;
                setPolicyContent({
                    title: data?.title ?? currentPolicy.title,
                    content_markdown: data?.content_markdown ?? "",
                    version: currentPolicy.version,
                    policy_id: currentPolicy.policy_id,
                });
            } catch {
                setError("Failed to load policy. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchPolicy();
    }, [currentIndex, currentPolicy]);

    const handleConsent = async () => {
        if (!currentPolicy) return;

        setSubmitting(true);
        setError(null);
        try {
            await postApiData("/legal/consent", {
                policy_id: Number(currentPolicy.policy_id),
            });

            if (currentIndex < missingPolicies.length - 1) {
                setCurrentIndex((prev) => prev + 1);
            } else {
                onAllConsented();
            }
        } catch {
            setError("Failed to submit consent. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={true}>
            <DialogContent
                showCloseButton={false}
                className="max-h-[90vh] overflow-hidden flex flex-col sm:max-w-2xl"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>
                        {loading
                            ? "Loading Policy..."
                            : (policyContent?.title ?? currentPolicy?.title)}
                    </DialogTitle>
                    <DialogDescription>
                        Please review and accept the following policy to
                        continue.
                        {missingPolicies.length > 1 && (
                            <span className="ml-1">
                                ({currentIndex + 1} of {missingPolicies.length})
                            </span>
                        )}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto max-h-[50vh] border rounded-md p-4 text-sm leading-relaxed">
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="size-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : error && !policyContent ? (
                        <p className="text-destructive">{error}</p>
                    ) : (
                        <div
                            className="prose prose-sm dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: markdownToHtml(
                                    policyContent?.content_markdown ?? "",
                                ),
                            }}
                        />
                    )}
                </div>

                {error && policyContent && (
                    <p className="text-destructive text-sm">{error}</p>
                )}

                <div className="flex items-center gap-2 pt-2">
                    <Checkbox
                        id="accept-policy"
                        checked={accepted}
                        onCheckedChange={(checked) =>
                            setAccepted(checked === true)
                        }
                        disabled={loading || !policyContent}
                        className="border-black"
                    />
                    <label
                        htmlFor="accept-policy"
                        className="text-sm font-medium cursor-pointer select-none"
                    >
                        I have read and agree to the{" "}
                        {policyContent?.title ?? currentPolicy?.title}
                    </label>
                </div>

                <DialogFooter>
                    <Button
                        onClick={handleConsent}
                        disabled={!accepted || submitting || loading}
                    >
                        {submitting && (
                            <Loader2 className="size-4 animate-spin mr-2" />
                        )}
                        {currentIndex < missingPolicies.length - 1
                            ? "Accept & Continue"
                            : "Accept & Proceed"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
