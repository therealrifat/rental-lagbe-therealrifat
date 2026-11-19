"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ImageUpload({image}:{image:string}) {
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
    } catch (error) {
      console.error(error);
      alert("Image upload failed!");
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        name="image"
        type="url"
        placeholder="https://example.com/image"
        defaultValue={image??imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={loading}
        className="flex items-center gap-2 rounded-md bg-orange-600 px-3 py-1.5 text-sm text-white"
      >
        <Upload size={16} />
        {loading ? "Uploading" : "Upload"}
      </button>
    </div>
  );
}