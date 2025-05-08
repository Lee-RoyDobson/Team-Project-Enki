"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./TopicForm.module.css";
import { toast } from "react-toastify";

export default function TopicForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    initialMessage: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Call our API endpoint to create a new topic in MongoDB
      const response = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          initialMessage: formData.initialMessage,
          moduleId: "5CM504", // Hardcoded for now, could be from a dropdown in future
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create topic");
      }

      // Store success message in sessionStorage to display on dashboard
      sessionStorage.setItem(
        "topicNotification",
        `Topic "${formData.title}" created successfully!`
      );

      // Navigate back to instructor dashboard
      router.push("/instructor/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.heading}>Create New Topic</h1>
        <div className={styles.formCard}>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Topic Title</label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="initialMessage">Initial Message</label>
              <textarea
                id="initialMessage"
                name="initialMessage"
                value={formData.initialMessage}
                onChange={handleChange}
                rows={5}
                className={styles.textarea}
              />
              <small className={styles.helperText}>
                This message will be shown to students when they first access
                the topic
              </small>
            </div>
            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.buttonSecondary}
                onClick={() => router.back()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.buttonPrimary}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Create Topic"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
