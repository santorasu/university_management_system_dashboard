import React from 'react';
import { useLibraryFlow } from '../../../../application/state/library-flow.context';
import type { LibrarySubScreen } from '../../../../core/entities/library.types';

interface TabItem {
  id: LibrarySubScreen;
  label: string;
}

const TABS: TabItem[] = [
  { id: 'LIBRARY_INVENTORY', label: 'Library Inventory' },
  { id: 'BOOK_DETAILS_LENDING', label: 'Book Details & Lending' },
  { id: 'DOCUMENT_MANAGEMENT', label: 'Document Management' },
];

export const LibraryNavTabs: React.FC = () => {
  const {
    subScreen,
    goToLibraryInventory,
    goToBookDetails,
    goToDocumentManagement,
  } = useLibraryFlow();

  const handleTabClick = (id: LibrarySubScreen) => {
    switch (id) {
      case 'LIBRARY_INVENTORY':
        goToLibraryInventory();
        break;
      case 'BOOK_DETAILS_LENDING':
        goToBookDetails();
        break;
      case 'DOCUMENT_MANAGEMENT':
        goToDocumentManagement();
        break;
    }
  };

  return (
    <nav className="library-nav-tabs" aria-label="Library and Documents Navigation">
      {TABS.map((tab) => {
        const isActive = subScreen === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`library-nav-tab ${isActive ? 'library-nav-tab--active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
            aria-current={isActive ? 'page' : undefined}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};
