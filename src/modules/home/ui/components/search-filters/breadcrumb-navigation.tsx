import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface Props {
  activeCategoryName?: string | null;
  activeCategory?: string | null;
  activeSubcategoryName?: string | null;
}

export const BreadcrumbNavigation = ({
  activeCategoryName,
  activeCategory,
  activeSubcategoryName,
}: Props) => {
  if (!activeCategoryName || activeCategory === 'all') return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {activeSubcategoryName ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className='text-xl font-medium underline text-primary'>
                <Link href={`/${activeCategory}`}>{activeCategoryName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='text-primary font-medium text-lg'>
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className='text-xl font-medium'>
                {activeSubcategoryName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
         ) : (
          <BreadcrumbItem>
            <BreadcrumbPage className='text-xl font-medium'>
              {activeCategoryName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
