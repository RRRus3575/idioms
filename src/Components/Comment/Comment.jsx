"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import StarRating from "../StarRating/StarRating";
import styles from "./Comment.module.css";
import { saveDraft, loadDraft, clearDraft } from "@/utils/ratingDraft";
import Button from "../Button/Button";

// утилита проверки авторизации через твой бэкенд
async function fetchMe() {
  try {
    const r = await fetch("/auth/me", {
      method: "GET",
      credentials: "include",      // важно: чтобы шли httpOnly cookies
    });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

export default function CommentBlock({ idiomId }) {
  const router = useRouter();
  const pathname = usePathname();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // подтянуть черновик при монтировании/смене idiomId
  useEffect(() => {
    if (typeof window === "undefined") return;
    const draft = loadDraft(idiomId);
    if (draft) {
      if (draft.rating != null) setRating(draft.rating);
      if (draft.comment != null) setComment(draft.comment);
    }
  }, [idiomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return; // запрещаем отправку без оценки

    const me = await fetchMe();
    if (!me) {
      // не залогинен: сохраняем черновик и уводим на форму входа
      saveDraft(idiomId, { rating, comment });
      router.push(`/login?callback=${encodeURIComponent(pathname)}`);
      return;
    }

    // залогинен: отправляем на API
    try {
      setSubmitting(true);
      const res = await fetch("/api/idioms/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // если используешь httpOnly cookies
        body: JSON.stringify({ idiomId, rating, comment }),
      });

      if (!res.ok) {
        // тут можно показать тост об ошибке
        throw new Error("Failed to submit rating");
      }

      clearDraft(idiomId);
      setComment("");
      // тут можно перезагрузить данные/показать тост/рефетч
      // router.refresh?.();
    } catch (err) {
      console.warn(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.comment}>
      <h3 className={styles.title}>Was it correct?</h3>
      <p className={styles.text}>
        Rate the accuracy and actuality of information provided and/or let us know if we missed something.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Rate the idiom accuracy *
          <StarRating
            onChange={setRating}
            label="Rate the idiom accuracy"
            value={rating}
            size={28}
          />
        </label>

        <label className={`${styles.label} ${styles.bloctextarea}`}>
          Add a comment for more details
          <textarea
            className={styles.textarea}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            rows={4}
          />
        </label>

        <Button 
        disabled={submitting || rating<1} 
        type="submit" 
        text={submitting ? "Sending..." : "Send"}
        />
      </form>
    </div>
  );
}
