export function Account() {
  return (
    <div className="min-h-screen pt-28 md:pt-32">
      <div className="container-shell section-block">
        <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-bold mb-4">My Account</h1>
        <p className="text-muted-foreground mb-[clamp(2rem,5vw,3rem)] max-w-2xl text-[clamp(0.95rem,2vw,1.1rem)]">
          Manage profile details, orders, saved addresses, and preferences.
        </p>

        <div className="grid gap-[clamp(1rem,2.5vw,1.75rem)] [grid-template-columns:repeat(auto-fit,minmax(14rem,1fr))]">
          <article className="rounded-xl border border-border bg-card p-[clamp(1rem,2.3vw,1.5rem)]">
            <h2 className="font-semibold mb-2">Profile</h2>
            <p className="text-sm text-muted-foreground">Update name, email, and mobile number.</p>
          </article>
          <article className="rounded-xl border border-border bg-card p-[clamp(1rem,2.3vw,1.5rem)]">
            <h2 className="font-semibold mb-2">Orders</h2>
            <p className="text-sm text-muted-foreground">Track orders and review order history.</p>
          </article>
          <article className="rounded-xl border border-border bg-card p-[clamp(1rem,2.3vw,1.5rem)]">
            <h2 className="font-semibold mb-2">Addresses</h2>
            <p className="text-sm text-muted-foreground">Manage shipping and billing addresses.</p>
          </article>
          <article className="rounded-xl border border-border bg-card p-[clamp(1rem,2.3vw,1.5rem)]">
            <h2 className="font-semibold mb-2">Preferences</h2>
            <p className="text-sm text-muted-foreground">Save preferred brands and notifications.</p>
          </article>
        </div>
      </div>
    </div>
  );
}
