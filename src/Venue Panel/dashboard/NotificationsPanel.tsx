import { NOTIFICATIONS } from "./dashboardData";

/** "Notifications" — recent activity feed, unread items marked with a pink dot. */
export function NotificationsPanel() {
  return (
    <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-sm">
      <h3 className="font-serif text-lg font-semibold text-ink">Notifications</h3>
      <ul className="mt-3 flex flex-col gap-2">
        {NOTIFICATIONS.map((notification) => (
          <li
            key={notification.id}
            className={`flex items-start gap-3 rounded-xl px-3 py-2.5 ${
              notification.isUnread ? "bg-brand/5" : ""
            }`}
          >
            <span
              className={`mt-1.5 size-2 shrink-0 rounded-full ${
                notification.isUnread ? "bg-brand" : "bg-ink/20"
              }`}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">{notification.title}</p>
              <p className="truncate text-sm text-ink/50">{notification.description}</p>
            </div>
            <span className="shrink-0 text-xs text-ink/40">{notification.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
