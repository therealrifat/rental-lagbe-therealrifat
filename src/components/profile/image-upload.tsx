"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ImageUploadProps = {
  image: string;
  onPreviewChange?: (url: string) => void;
};

export default function ImageUpload({
  image,
  onPreviewChange,
}: ImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Image upload failed");
      }

      setImageUrl(result.data.url);
      onPreviewChange?.(result.data.url);
    } catch (error) {
      console.error(error);
      alert("Image upload failed!");
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <Input
        name="image"
        type="url"
        placeholder="https://example.com/image"
        value={imageUrl || image}
        onChange={(e) => {
          setImageUrl(e.target.value);
          onPreviewChange?.(e.target.value);
        }}
        className="flex-1"
        required
      />

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />

      <Button
        type="button"
        variant="outline"
        onClick={() => fileRef.current?.click()}
        disabled={loading}
        className="shrink-0"
      >
        <Upload size={16} />
        {loading ? "Uploading" : "Upload"}
      </Button>
    </div>
  );
}