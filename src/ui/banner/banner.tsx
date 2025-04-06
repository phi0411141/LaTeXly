/**
 * Announcement banner (likely be removed in the future)
 */

import { useState } from 'react';

export function Banner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="isolate flex justify-between border-b-1 bg-yellow-100 p-0.5">
      <span aria-hidden="true"></span>
    </div>
  );
}
