"use client";

import { useState, useCallback } from "react";
import type { ArtworkProduct, CartItem } from "@/types/artwork";

export interface CartAPI {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (artwork: ArtworkProduct) => void;
  removeItem: (id: string) => void;
  isInCart: (id: string) => boolean;
}

export function useCart(): CartAPI {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((artwork: ArtworkProduct) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.artwork.id === artwork.id);
      if (existing) {
        return prev.map((i) =>
          i.artwork.id === artwork.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { artwork, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.artwork.id !== id));
  }, []);

  const isInCart = useCallback(
    (id: string) => items.some((i) => i.artwork.id === id),
    [items],
  );

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.artwork.price * i.quantity, 0);

  return { items, count, total, addItem, removeItem, isInCart };
}
