"use client";

export function GuestBanner() {
  return (
    <div className="sticky top-0 z-50 flex h-8 items-center justify-center bg-muted border-b border-border">
      <p className="text-xs text-muted-foreground">
        游客模式 · 数据仅本地保存
      </p>
    </div>
  );
}
