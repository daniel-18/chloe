"use client";

import { useState } from "react";
import type { CartItem } from "@/types/artwork";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onRemove: (id: string) => void;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

type Step = "cart" | "checkout" | "confirmed";
type PayMethod = "apple" | "card";

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "JP", name: "Japan" },
  { code: "SG", name: "Singapore" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "OTHER", name: "Other" },
];

function fmtCardNumber(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function fmtExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const initialForm = {
  // contact
  email: "", phone: "",
  // shipping
  shipName: "", shipAddr1: "", shipAddr2: "", shipCity: "", shipState: "", shipZip: "", shipCountry: "US",
  // billing (when different from shipping)
  billAddr1: "", billAddr2: "", billCity: "", billState: "", billZip: "", billCountry: "US",
  // card
  cardName: "", cardNumber: "", cardExpiry: "", cardCvv: "",
};

type FormState = typeof initialForm;

export function CartDrawer({ open, onClose, items, total, onRemove }: CartDrawerProps) {
  const [step, setStep] = useState<Step>("cart");
  const [pay, setPay] = useState<PayMethod>("apple");
  const [form, setForm] = useState<FormState>(initialForm);
  const [sameAddr, setSameAddr] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderNum] = useState(`CH-${Math.floor(10000 + Math.random() * 90000)}`);

  const reset = () => {
    setStep("cart");
    setForm(initialForm);
    setSameAddr(true);
    setErrors({});
    setPay("apple");
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 380);
  };

  const f = (key: keyof FormState, val: string) => {
    setForm(prev => ({ ...prev, [key]: val }));
    setErrors(prev => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.shipName.trim()) e.shipName = "Required";
    if (!form.shipAddr1.trim()) e.shipAddr1 = "Required";
    if (!form.shipCity.trim()) e.shipCity = "Required";
    if (!form.shipState.trim()) e.shipState = "Required";
    if (!form.shipZip.trim()) e.shipZip = "Required";
    if (!sameAddr) {
      if (!form.billAddr1.trim()) e.billAddr1 = "Required";
      if (!form.billCity.trim()) e.billCity = "Required";
      if (!form.billState.trim()) e.billState = "Required";
      if (!form.billZip.trim()) e.billZip = "Required";
    }
    if (!form.cardName.trim()) e.cardName = "Required";
    if (form.cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Invalid card number";
    if (form.cardExpiry.length < 5) e.cardExpiry = "Invalid";
    if (form.cardCvv.length < 3) e.cardCvv = "Invalid";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = () => {
    if (pay === "card" && !validate()) return;
    setStep("confirmed");
  };

  const inp = (key: keyof FormState, err?: string) => (
    <span className={`co-input-err-wrap${err ? " has-err" : ""}`} />
  );

  return (
    <>
      <div className={`dg-overlay${open ? " open" : ""}`} onClick={handleClose} aria-hidden="true" />

      <div className={`dg-drawer${open ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Cart">

        {/* ── CART ── */}
        {step === "cart" && (
          <>
            <div className="dg-drawer-head">
              <h2 className="dg-drawer-title">Your Cart</h2>
              <button className="dg-drawer-close" onClick={handleClose} aria-label="Close"><CloseIcon /></button>
            </div>

            <div className="dg-drawer-items">
              {items.length === 0 ? (
                <div className="dg-empty">
                  <span className="dg-empty-icon">◻</span>
                  <p>Your cart is empty.</p>
                  <p style={{ fontSize: ".78rem", color: "#7a6f68" }}>Add an artwork to get started.</p>
                </div>
              ) : items.map(({ artwork, quantity }) => (
                <div className="dg-ci" key={artwork.id}>
                  <img className="dg-ci-img" src={artwork.img} alt={artwork.title} draggable="false" />
                  <div className="dg-ci-info">
                    <p className="dg-ci-title">{artwork.title}</p>
                    <p className="dg-ci-sub">{artwork.artist} · {artwork.edition}{quantity > 1 ? ` × ${quantity}` : ""}</p>
                    <p className="dg-ci-price">{fmt(artwork.price * quantity)}</p>
                  </div>
                  <button className="dg-ci-remove" onClick={() => onRemove(artwork.id)} aria-label={`Remove ${artwork.title}`}>
                    <CloseIcon />
                  </button>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="dg-drawer-foot">
                <div className="dg-subtotal">
                  <span className="dg-subtotal-label">Subtotal</span>
                  <span className="dg-subtotal-value">{fmt(total)}</span>
                </div>
                <button className="dg-checkout" onClick={() => setStep("checkout")}>Proceed to checkout →</button>
              </div>
            )}
          </>
        )}

        {/* ── CHECKOUT ── */}
        {step === "checkout" && (
          <>
            <div className="dg-drawer-head co-head">
              <button className="co-back" onClick={() => setStep("cart")}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M19 12H5M11 6l-6 6 6 6" />
                </svg>
                Cart
              </button>
              <h2 className="dg-drawer-title">Checkout</h2>
              <button className="dg-drawer-close" onClick={handleClose} aria-label="Close"><CloseIcon /></button>
            </div>

            <div className="dg-drawer-items">

              {/* order summary */}
              <div className="co-section">
                <p className="co-label">Order summary</p>
                {items.map(({ artwork, quantity }) => (
                  <div className="co-item" key={artwork.id}>
                    <img className="co-item-img" src={artwork.img} alt={artwork.title} draggable="false" />
                    <span className="co-item-name">{artwork.title}{quantity > 1 ? ` ×${quantity}` : ""}</span>
                    <span className="co-item-price">{fmt(artwork.price * quantity)}</span>
                  </div>
                ))}
                <div className="co-total-row">
                  <span>Total</span>
                  <span className="co-total-val">{fmt(total)}</span>
                </div>
              </div>

              {/* payment method toggle */}
              <div className="co-section">
                <p className="co-label">Payment method</p>
                <div className="co-methods">
                  <button className={`co-method${pay === "apple" ? " active" : ""}`} onClick={() => setPay("apple")}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    Apple Pay
                  </button>
                  <button className={`co-method${pay === "card" ? " active" : ""}`} onClick={() => setPay("card")}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <rect x="2" y="5" width="20" height="14" rx="2"/>
                      <path d="M2 10h20"/>
                    </svg>
                    Credit card
                  </button>
                </div>

                {pay === "apple" && (
                  <button className="co-apple-pay-btn" onClick={handlePlaceOrder}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    Pay with Apple Pay
                  </button>
                )}
              </div>

              {/* credit card extended form */}
              {pay === "card" && (
                <>
                  {/* contact */}
                  <div className="co-section">
                    <p className="co-label">Contact</p>
                    <div className="co-form">
                      <div className="co-field">
                        <label className="co-field-label">Email address</label>
                        <input
                          className={`co-input${errors.email ? " co-input-err" : ""}`}
                          type="email"
                          placeholder="jane@example.com"
                          value={form.email}
                          onChange={e => f("email", e.target.value)}
                          autoComplete="email"
                        />
                        {errors.email && <span className="co-err-msg">{errors.email}</span>}
                      </div>
                      <div className="co-field">
                        <label className="co-field-label">Phone number</label>
                        <input
                          className={`co-input${errors.phone ? " co-input-err" : ""}`}
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={form.phone}
                          onChange={e => f("phone", e.target.value)}
                          autoComplete="tel"
                        />
                        {errors.phone && <span className="co-err-msg">{errors.phone}</span>}
                      </div>
                    </div>
                  </div>

                  {/* shipping address */}
                  <div className="co-section">
                    <p className="co-label">Shipping address</p>
                    <div className="co-form">
                      <div className="co-field">
                        <label className="co-field-label">Full name</label>
                        <input
                          className={`co-input${errors.shipName ? " co-input-err" : ""}`}
                          placeholder="Jane Smith"
                          value={form.shipName}
                          onChange={e => f("shipName", e.target.value)}
                          autoComplete="name"
                        />
                        {errors.shipName && <span className="co-err-msg">{errors.shipName}</span>}
                      </div>
                      <div className="co-field">
                        <label className="co-field-label">Address line 1</label>
                        <input
                          className={`co-input${errors.shipAddr1 ? " co-input-err" : ""}`}
                          placeholder="123 Main Street"
                          value={form.shipAddr1}
                          onChange={e => f("shipAddr1", e.target.value)}
                          autoComplete="address-line1"
                        />
                        {errors.shipAddr1 && <span className="co-err-msg">{errors.shipAddr1}</span>}
                      </div>
                      <div className="co-field">
                        <label className="co-field-label">Address line 2 <span className="co-optional">(optional)</span></label>
                        <input
                          className="co-input"
                          placeholder="Apt, suite, unit…"
                          value={form.shipAddr2}
                          onChange={e => f("shipAddr2", e.target.value)}
                          autoComplete="address-line2"
                        />
                      </div>
                      <div className="co-row-2">
                        <div className="co-field">
                          <label className="co-field-label">City</label>
                          <input
                            className={`co-input${errors.shipCity ? " co-input-err" : ""}`}
                            placeholder="New York"
                            value={form.shipCity}
                            onChange={e => f("shipCity", e.target.value)}
                            autoComplete="address-level2"
                          />
                          {errors.shipCity && <span className="co-err-msg">{errors.shipCity}</span>}
                        </div>
                        <div className="co-field">
                          <label className="co-field-label">State / Region</label>
                          <input
                            className={`co-input${errors.shipState ? " co-input-err" : ""}`}
                            placeholder="NY"
                            value={form.shipState}
                            onChange={e => f("shipState", e.target.value)}
                            autoComplete="address-level1"
                          />
                          {errors.shipState && <span className="co-err-msg">{errors.shipState}</span>}
                        </div>
                      </div>
                      <div className="co-row-2">
                        <div className="co-field">
                          <label className="co-field-label">ZIP / Postal code</label>
                          <input
                            className={`co-input${errors.shipZip ? " co-input-err" : ""}`}
                            placeholder="10001"
                            value={form.shipZip}
                            onChange={e => f("shipZip", e.target.value)}
                            autoComplete="postal-code"
                          />
                          {errors.shipZip && <span className="co-err-msg">{errors.shipZip}</span>}
                        </div>
                        <div className="co-field">
                          <label className="co-field-label">Country</label>
                          <select
                            className="co-input co-select"
                            value={form.shipCountry}
                            onChange={e => f("shipCountry", e.target.value)}
                            autoComplete="country"
                          >
                            {COUNTRIES.map(c => (
                              <option key={c.code} value={c.code}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* billing address */}
                  <div className="co-section">
                    <p className="co-label">Billing address</p>
                    <label className="co-same-addr">
                      <input
                        type="checkbox"
                        className="co-checkbox"
                        checked={sameAddr}
                        onChange={e => setSameAddr(e.target.checked)}
                      />
                      <span className="co-checkmark" aria-hidden="true">
                        {sameAddr && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </span>
                      Same as shipping address
                    </label>

                    {!sameAddr && (
                      <div className="co-form" style={{ marginTop: "14px" }}>
                        <div className="co-field">
                          <label className="co-field-label">Address line 1</label>
                          <input
                            className={`co-input${errors.billAddr1 ? " co-input-err" : ""}`}
                            placeholder="123 Main Street"
                            value={form.billAddr1}
                            onChange={e => f("billAddr1", e.target.value)}
                          />
                          {errors.billAddr1 && <span className="co-err-msg">{errors.billAddr1}</span>}
                        </div>
                        <div className="co-field">
                          <label className="co-field-label">Address line 2 <span className="co-optional">(optional)</span></label>
                          <input
                            className="co-input"
                            placeholder="Apt, suite, unit…"
                            value={form.billAddr2}
                            onChange={e => f("billAddr2", e.target.value)}
                          />
                        </div>
                        <div className="co-row-2">
                          <div className="co-field">
                            <label className="co-field-label">City</label>
                            <input
                              className={`co-input${errors.billCity ? " co-input-err" : ""}`}
                              placeholder="New York"
                              value={form.billCity}
                              onChange={e => f("billCity", e.target.value)}
                            />
                            {errors.billCity && <span className="co-err-msg">{errors.billCity}</span>}
                          </div>
                          <div className="co-field">
                            <label className="co-field-label">State / Region</label>
                            <input
                              className={`co-input${errors.billState ? " co-input-err" : ""}`}
                              placeholder="NY"
                              value={form.billState}
                              onChange={e => f("billState", e.target.value)}
                            />
                            {errors.billState && <span className="co-err-msg">{errors.billState}</span>}
                          </div>
                        </div>
                        <div className="co-row-2">
                          <div className="co-field">
                            <label className="co-field-label">ZIP / Postal code</label>
                            <input
                              className={`co-input${errors.billZip ? " co-input-err" : ""}`}
                              placeholder="10001"
                              value={form.billZip}
                              onChange={e => f("billZip", e.target.value)}
                            />
                            {errors.billZip && <span className="co-err-msg">{errors.billZip}</span>}
                          </div>
                          <div className="co-field">
                            <label className="co-field-label">Country</label>
                            <select
                              className="co-input co-select"
                              value={form.billCountry}
                              onChange={e => f("billCountry", e.target.value)}
                            >
                              {COUNTRIES.map(c => (
                                <option key={c.code} value={c.code}>{c.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* card details */}
                  <div className="co-section">
                    <p className="co-label">Card details</p>
                    <div className="co-form">
                      <div className="co-field">
                        <label className="co-field-label">Name on card</label>
                        <input
                          className={`co-input${errors.cardName ? " co-input-err" : ""}`}
                          placeholder="Jane Smith"
                          value={form.cardName}
                          onChange={e => f("cardName", e.target.value)}
                          autoComplete="cc-name"
                        />
                        {errors.cardName && <span className="co-err-msg">{errors.cardName}</span>}
                      </div>
                      <div className="co-field">
                        <label className="co-field-label">Card number</label>
                        <div className="co-card-wrap">
                          <input
                            className={`co-input${errors.cardNumber ? " co-input-err" : ""}`}
                            placeholder="1234 5678 9012 3456"
                            value={form.cardNumber}
                            inputMode="numeric"
                            onChange={e => f("cardNumber", fmtCardNumber(e.target.value))}
                            autoComplete="cc-number"
                          />
                          <span className="co-card-badge">
                            <svg width="34" height="21" viewBox="0 0 50 32" fill="none">
                              <circle cx="20" cy="16" r="10" fill="#EB001B" fillOpacity=".65"/>
                              <circle cx="30" cy="16" r="10" fill="#F79E1B" fillOpacity=".65"/>
                            </svg>
                          </span>
                        </div>
                        {errors.cardNumber && <span className="co-err-msg">{errors.cardNumber}</span>}
                      </div>
                      <div className="co-row-2">
                        <div className="co-field">
                          <label className="co-field-label">Expiry</label>
                          <input
                            className={`co-input${errors.cardExpiry ? " co-input-err" : ""}`}
                            placeholder="MM / YY"
                            value={form.cardExpiry}
                            inputMode="numeric"
                            onChange={e => f("cardExpiry", fmtExpiry(e.target.value))}
                            autoComplete="cc-exp"
                          />
                          {errors.cardExpiry && <span className="co-err-msg">{errors.cardExpiry}</span>}
                        </div>
                        <div className="co-field">
                          <label className="co-field-label">CVV</label>
                          <input
                            className={`co-input${errors.cardCvv ? " co-input-err" : ""}`}
                            placeholder="123"
                            value={form.cardCvv}
                            inputMode="numeric"
                            maxLength={4}
                            onChange={e => f("cardCvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                            autoComplete="cc-csc"
                          />
                          {errors.cardCvv && <span className="co-err-msg">{errors.cardCvv}</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="co-secure">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="11" width="18" height="11" rx="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                    256-bit SSL encryption
                  </div>
                </>
              )}

              {pay === "apple" && (
                <div className="co-secure">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  256-bit SSL encryption
                </div>
              )}
            </div>

            {pay === "card" && (
              <div className="dg-drawer-foot">
                <button className="dg-checkout" onClick={handlePlaceOrder}>
                  Place Order · {fmt(total)}
                </button>
              </div>
            )}
          </>
        )}

        {/* ── CONFIRMED ── */}
        {step === "confirmed" && (
          <div className="co-confirmed">
            <div className="co-check-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 className="co-confirmed-title">Order placed!</h2>
            <p className="co-confirmed-sub">
              A confirmation has been sent to{" "}
              <strong>{form.email || "your email"}</strong>.
            </p>
            <p className="co-order-num">{orderNum}</p>
            <button className="dg-checkout co-continue-btn" onClick={() => { reset(); handleClose(); }}>
              Continue browsing
            </button>
          </div>
        )}

      </div>
    </>
  );
}
