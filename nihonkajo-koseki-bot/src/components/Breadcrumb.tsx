import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface BreadcrumbProps {
  baseName?: string; 
  routeNames?: Record<string, string>;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  baseName = 'Home',
  routeNames = {},
}) => {
  const router = useRouter();
  const pathArray = router.pathname.split('/').filter((path) => path);

  return (
    <nav className="text-gray-600 text-sm" aria-label="breadcrumb">
      <ol className="flex space-x-2">
        <li>
          <Link href="/">
            <p className="text-blue-500 hover:underline">{baseName}</p>
          </Link>
        </li>

        {pathArray.length > 0 && <li className="text-gray-500">/</li>}

        {pathArray.map((path, index) => {
          const href = '/' + pathArray.slice(0, index + 1).join('/');

          const isLast = index === pathArray.length - 1;

          const displayName = routeNames[path] || path;

          return (
            <React.Fragment key={href}>
              <li>
                {!isLast ? (
                  <Link href={href}>
                    <p className="text-blue-500 hover:underline capitalize">
                      {displayName}
                    </p>
                  </Link>
                ) : (
                  <span className="text-gray-500 capitalize">{displayName}</span>
                )}
              </li>
              {!isLast && <li className="text-gray-500">/</li>}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
