"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const params = useParams();

  useEffect(() => {
    // Check if feedback was already submitted
    if (localStorage.getItem("crexio_feedback_submitted") === "true") {
      setIsSubmitted(true);
    }
    
    // Listen for custom event to open feedback widget (e.g. from summary page)
    const handleOpenFeedback = () => {
      if (localStorage.getItem("crexio_feedback_submitted") !== "true") {
        setIsOpen(true);
      }
    };
    
    window.addEventListener("open_feedback_widget", handleOpenFeedback);
    return () => window.removeEventListener("open_feedback_widget", handleOpenFeedback);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const roomCode = params?.roomCode || null;
      const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
      
      const res = await fetch(`${apiUrl}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, roomCode }),
      });
      
      if (res.ok) {
        setIsSubmitted(true);
        localStorage.setItem("crexio_feedback_submitted", "true");
        // Automatically close after showing thank you
        setTimeout(() => setIsOpen(false), 3000);
      } else {
        alert("Failed to submit feedback. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If they've already submitted and the widget is closed, do not show the button at all?
  // User asked: "ones the feed back complte give a msg with thank you like from crexio like that one and ones the feed back compled dotn show to the user in the end auction but the lilite emjoi with in the down t must be permant"
  // Wait, so the little emoji floating button must be permanent even if submitted.
  
  return (
    <>
      <div className="fixed bottom-6 right-6 z-[999]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-[#0066FF] hover:bg-[#3B82F6] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,102,255,0.4)] transition-transform hover:scale-110"
          aria-label="Feedback"
        >
          <span className="text-2xl">💬</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[320px] sm:w-[350px] bg-[#0A0A0A] border border-[rgba(255,255,255,0.1)] rounded-2xl shadow-2xl z-[1000] overflow-hidden"
          >
            <div className="bg-[#111111] p-4 flex justify-between items-center border-b border-[rgba(255,255,255,0.05)]">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span>📝</span> Feedback
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#6B7280] hover:text-white transition-colors p-1"
              >
                ✕
              </button>
            </div>
            
            <div className="p-5">
              {isSubmitted ? (
                <div className="text-center py-6">
                  <div className="text-4xl mb-4">🙏</div>
                  <h4 className="font-bold text-white mb-2">Thank you from Crexio!</h4>
                  <p className="text-[#6B7280] text-sm">We appreciate your feedback and are constantly working to improve the platform.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <p className="text-sm text-[#B8C0D4] mb-3">
                    Have a suggestion, found a bug, or just want to say hi? Let us know!
                  </p>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your feedback here..."
                    className="w-full h-32 bg-[#050505] border border-[rgba(255,255,255,0.1)] rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[#0066FF] resize-none mb-4"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !message.trim()}
                    className="w-full py-2.5 bg-[#0066FF] hover:bg-[#3B82F6] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg text-sm transition-colors uppercase tracking-wider"
                  >
                    {isSubmitting ? "Sending..." : "Submit"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
