import { Link } from '@heroui/react';
import {
  USERNAME,
} from '@/lib/constants/constants';

export function Footer() {
  return (
    <div className="fixed bottom-0 left-1 isolate text-xs">
      <div>
        <Link
          href="https://github.com/dulapahv"
          isExternal
          showAnchorIcon
          className="text-xs text-neutral-500"
        >
          Original creator {USERNAME}
        </Link>
      </div>
    </div>
  );
}
