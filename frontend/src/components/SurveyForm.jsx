import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, Send } from "lucide-react";

const SurveyForm = ({ detection, onReset }) => {
  const [submitted, setSubmitted] = useState(false);

  if (!detection) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      onReset();
    }, 2000);
  };

  /* ------------------ SUBMITTED STATE ------------------ */
  if (submitted) {
    return (
      <div className="w-full max-w-xl mt-8 bg-slate-800/60 border border-emerald-500/40 rounded-2xl p-6 text-center">
        <h3 className="text-2xl font-bold text-emerald-400 mb-2">
          Thank you! 🙌
        </h3>
        <p className="text-slate-400">
          Your feedback has been recorded successfully.
        </p>
      </div>
    );
  }

  /* ------------------ FORM ------------------ */
  return (
    <div className="w-full max-w-xl mt-8 bg-slate-900/70 border border-white/10 rounded-2xl p-5 sm:p-6">
      <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">
        AI Verification
      </h3>

      {/* Detection Info */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
        <div
          className={`w-3 h-3 mt-1 rounded-full ${
            detection.waste_type === "Wet Waste"
              ? "bg-emerald-400"
              : "bg-blue-400"
          }`}
        />
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          AI detected <strong>{detection.class}</strong> as{" "}
          <strong>{detection.waste_type}</strong>. Is this correct?
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* FEEDBACK OPTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* YES */}
          <label className="cursor-pointer">
            <input
              type="radio"
              name="feedback"
              value="yes"
              required
              className="hidden peer"
            />
            <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-white/10 bg-white/5
                            peer-checked:border-emerald-500 peer-checked:bg-emerald-500/10 transition">
              <ThumbsUp size={28} className="text-emerald-400" />
              <span className="font-semibold text-white">Yes, Correct</span>
            </div>
          </label>

          {/* NO */}
          <label className="cursor-pointer">
            <input
              type="radio"
              name="feedback"
              value="no"
              required
              className="hidden peer"
            />
            <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-white/10 bg-white/5
                            peer-checked:border-red-500 peer-checked:bg-red-500/10 transition">
              <ThumbsDown size={28} className="text-red-400" />
              <span className="font-semibold text-white">No, Incorrect</span>
            </div>
          </label>
        </div>

        {/* OPTIONAL COMMENT */}
        <textarea
          rows={3}
          placeholder="Add details (e.g. 'This is plastic, not glass')"
          className="w-full resize-none rounded-xl bg-slate-800/70 border border-white/10
                     p-3 text-sm sm:text-base text-white placeholder:text-slate-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600
                     text-white font-semibold py-3 rounded-xl transition"
        >
          <Send size={18} />
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;
