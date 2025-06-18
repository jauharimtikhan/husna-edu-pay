// resources/js/Components/MarkdownEditor.tsx

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
    value?: string;
    onChange?: (val: string) => void;
};

export default function MarkdownEditor({ value = "", onChange }: Props) {
    const [content, setContent] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setContent(newValue);
        onChange?.(newValue);
    };

    return (
        <div className="space-y-2">
            <Label className="text-base">Markdown Editor</Label>

            <Tabs defaultValue="edit" className="w-full">
                <TabsList>
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="edit">
                    <Textarea
                        className="min-h-[250px] font-mono"
                        placeholder="Tulis markdown di sini..."
                        value={content}
                        onChange={handleChange}
                    />
                </TabsContent>

                <TabsContent value="preview">
                    <div className="prose dark:prose-invert max-w-none bg-muted p-4 rounded-md overflow-auto">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
