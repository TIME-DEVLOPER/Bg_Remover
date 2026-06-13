import { useState } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
  };

  const removeBackground = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        "http://localhost:5000/remove-bg",
        {
          method: "POST",
          body: formData,
        }
      );

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      setResult(imageUrl);
    } catch (error) {
      console.error(error);
      alert("Failed to remove background");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-600 via-purple-600 to-pink-500 flex items-center justify-center p-3 sm:p-5">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl">

        <h1 className="text-2xl sm:text-4xl font-bold text-center text-white">
          Background Remover
        </h1>

        <p className="text-sm sm:text-base text-center text-white/70 mt-2">
          Upload image and remove background instantly
        </p>

        <label className="mt-6 sm:mt-8 flex flex-col justify-center items-center border-2 border-dashed border-white/30 rounded-xl sm:rounded-2xl h-44 sm:h-60 cursor-pointer hover:bg-white/5 transition">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />

          <span className="text-4xl sm:text-6xl">📸</span>

          <h3 className="text-white text-lg sm:text-xl font-semibold mt-3">
            Choose Image
          </h3>

          <p className="text-white/60 text-sm">
            JPG, PNG, WEBP
          </p>
        </label>

        {preview && (
          <div className="mt-6">
            <h2 className="text-white font-semibold mb-2">
              Original Image
            </h2>

            <img
              src={preview}
              alt="Preview"
              className="w-full rounded-xl sm:rounded-2xl max-h-100 object-contain bg-white/10"
            />
          </div>
        )}

        <button
          onClick={removeBackground}
          disabled={loading}
          className="w-full mt-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white text-purple-700 font-bold text-base sm:text-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Removing Background..." : "Remove Background"}
        </button>

        {result && (
          <div className="mt-8">
            <h2 className="text-white font-semibold mb-2">
              Result
            </h2>

            <img
              src={result}
              alt="Result"
              className="w-full rounded-xl sm:rounded-2xl bg-white max-h-100 object-contain"
            />

            <a
              href={result}
              download="background-removed.png"
              className="block mt-4 text-center bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition"
            >
              Download PNG
            </a>
          </div>
        )}
      </div>
    </div>
  );
}