import React, { useEffect, useState, useRef } from 'react';
import NoteDomainForPint from '@/components/NoteDomainForPint';
import PrintComponentBadge from '@/components/PrintComponents/PrintGenerics/PrintComponentBadge';
import PrintComponentTitle from '@/components/PrintComponents/PrintGenerics/PrintComponentTitle';
import NoteClickable from '@/components/NoteClickable';

export interface ComponentConfig {
  componentType: 'static' | 'dynamic';
  clickableNote?: boolean;
  componentTitle?: string;
  badgeTitle?: string;
  forceSolo?: boolean; // Forces the component to be on its own page
  component: React.ReactNode;
}

interface PrintPageRendererProps {
  componentsList: ComponentConfig[];
  orientation: 'Portrait' | 'Landscape';
  isDataReady?: boolean;
}

// Height constants (in mm)
// All of them for A4 Page Dimensions Either Portrait or Landscape
const PAGE_HEIGHT_PORTRAIT = 297; 
const PAGE_HEIGHT_LANDSCAPE = 210; 
const PAGE_WIDTH_PORTRAIT = 210; 
const PAGE_WIDTH_LANDSCAPE = 297;
const COMPONENT_PADDING = 20; // Buffer space
const DYNAMIC_MARGIN = 20; // 20px margin for dynamic components

// Convert pixels to mm (96 DPI standard)
const pxToMm = (px: number) => px / (96 / 25.4);
const mmToPx = (mm: number) => mm * (96 / 25.4);

const PrintPageRenderer: React.FC<PrintPageRendererProps> = ({
  componentsList,
  orientation,
  isDataReady = false,
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [componentHeights, setComponentHeights] = useState<number[]>([]);
  const measurementRef = useRef<HTMLDivElement>(null);
  const componentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Check if any component is dynamic to apply margins
  const hasDynamicComponent = componentsList.some(config => config.componentType === 'dynamic');
  
  // Calculate page dimensions with margins for dynamic components
  const getPageDimensions = () => {
    const baseHeight = orientation === 'Portrait' ? PAGE_HEIGHT_PORTRAIT : PAGE_HEIGHT_LANDSCAPE;
    const baseWidth = orientation === 'Portrait' ? PAGE_WIDTH_PORTRAIT : PAGE_WIDTH_LANDSCAPE;
    
    if (hasDynamicComponent) {
      // Subtract 40mm total (20px margin × 2 for opposite sides)
      const marginAdjustment = DYNAMIC_MARGIN * 2;
      return {
        height: baseHeight - marginAdjustment,
        width: baseWidth - marginAdjustment,
        hasMargins: true
      };
    }
    
    return {
      height: baseHeight,
      width: baseWidth,
      hasMargins: false
    };
  };

  const pageDimensions = getPageDimensions();
  const pageHeight = pageDimensions.height;

  const renderComponent = (config: ComponentConfig, compIndex?: number, instanceIndex?: number, showBadge: boolean = true, showTitle: boolean = true): React.ReactNode => {
    const key = `${compIndex || 0}-${instanceIndex || 0}`;
    
    return (
      <div key={key} className="w-full">
        {/* Render clickable note if specified */}
        {config.clickableNote && (
          <div className='relative'>
          <NoteClickable />
          </div>
        )}

        {!config.clickableNote && <NoteDomainForPint /> }
        
        {/* Render badge title - only if showBadge is true */}
        {config.badgeTitle && showBadge && (
          <PrintComponentBadge badgeText={config.badgeTitle} />
        )}
        
        {/* Render component title - only if showTitle is true */}
        {config.componentTitle && showTitle && (
          <PrintComponentTitle title={config.componentTitle} />
        )}
        
        {/* Render the actual component */}
        {config.component}
      </div>
    );
  };

  // Wait for data loading and measure component heights
  useEffect(() => {
  let isMounted = true;

  const loadAndMeasure = async () => {
    // Wait for window load (all images and fonts)
    await new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        const handleLoad = () => {
          window.removeEventListener('load', handleLoad);
          resolve();
        };
        window.addEventListener('load', handleLoad);
      }
    });

    // Wait one frame for refs to settle
    requestAnimationFrame(() => {
      if (!isMounted) return;

      const allRefsReady = componentRefs.current.every((r) => !!r);
      if (!allRefsReady) {
        console.warn("Some refs not ready yet, retrying measurement...");
        setTimeout(loadAndMeasure, 300); // retry once more
        return;
      }

      measureComponentHeights();
      setDataLoaded(true);
    });
  };

  loadAndMeasure();

  return () => {
    isMounted = false;
  };
}, []); // 👈 only run once after mount

  
  const measureComponentHeights = () => {
    const heights: number[] = [];
    componentRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const heightMm = pxToMm(rect.height);
        heights[index] = heightMm + COMPONENT_PADDING;
        // console.log(`Component ${index} height: ${heightMm.toFixed(2)}mm (${rect.height}px)`);
      } else {
        console.warn("Component ref not found at index", index);
        heights[index] = 0; // fallback instead of crash
      }
    });
    setComponentHeights(heights);
    // console.log("✅ Component Heights:", heights);
    // console.log("📄 Page Height:", pageHeight, "mm");
  };

  // console.log("Component Heights:", componentHeights);

  const renderPages = () => {
    if (!dataLoaded || componentHeights.length === 0) {
      return (
        <div className="bg-[#EFF5FD]  w-full mx-auto">
          {/* Hidden measurement container */}
          <div 
            ref={measurementRef}
            className="absolute -top-[9999px] left-0 opacity-0 pointer-events-none"
            // style={{ width: '1550px' }}
          >
            {componentsList.map((config, index) => (
              <div 
                key={index}
                ref={el => { componentRefs.current[index] = el; }}
                className="w-full bg-red-500"
              >
                {renderComponent(config, index, 0)}
              </div>
            ))}
          </div>
          
          {/* Loading state */}
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-2xl">Loading and measuring components...</div>
          </div>
        </div>
      );
    }

    const pages: React.ReactNode[] = [];
    let currentPageComponents: React.ReactNode[] = [];
    let currentPageHeight = 0;
    let componentIndex = 0;
    let currentPageHasDynamic = false; // Track if current page has dynamic components
    let shownBadgesOnCurrentPage = new Set<string>(); // Track which badge texts have been shown on current page
    let shownTitlesOnCurrentPage = new Set<string>(); // Track which component titles have been shown on current page

    const addCurrentPageToPages = () => {
      if (currentPageComponents.length > 0) {
        // console.log(`📃 Finalizing page ${pages.length} with ${currentPageComponents.length} components (total height: ${currentPageHeight}mm)`);
        // console.log(`📏 Page dimensions: ${pageDimensions.width}mm × ${pageDimensions.height}mm (margins: ${currentPageHasDynamic ? 'applied' : 'none'})`);
        pages.push(
          <section
            key={`page-${pages.length}`}
            className="section relative"
            style={currentPageHasDynamic ? {
              padding: `${DYNAMIC_MARGIN}px`,
              boxSizing: 'border-box'
            } : {}}
          >
            <div className="w-full mx-auto">
              {currentPageComponents}
            </div>
          </section>
        );
        currentPageComponents = [];
        currentPageHeight = 0;
        currentPageHasDynamic = false; // Reset for next page
        shownBadgesOnCurrentPage = new Set<string>(); // Reset for new page
        shownTitlesOnCurrentPage = new Set<string>(); // Reset for new page
      }
    };

    const getComponentHeight = (componentIndex: number): number => {
      return componentHeights[componentIndex];
    };

    while (componentIndex < componentsList.length) {
      const currentConfig = componentsList[componentIndex];
      // console.log(`🔄 Processing component ${componentIndex}: ${currentConfig.componentType}`);
      
      // Determine if we should show badge and title based on whether they've been shown on current page
      const shouldShowBadge = currentConfig.badgeTitle ? !shownBadgesOnCurrentPage.has(currentConfig.badgeTitle) : true;
      const shouldShowTitle = currentConfig.componentTitle ? !shownTitlesOnCurrentPage.has(currentConfig.componentTitle) : true;
      
      if (currentConfig.componentType === 'static') {
        // Check if forceSolo is true or if component won't fit in current page
        const componentHeight = getComponentHeight(componentIndex);
        const needsNewPage = currentConfig.forceSolo || (currentPageHeight + componentHeight > pageHeight);
        
        // console.log(`📦 Static component - Height: ${componentHeight}mm, Current page: ${currentPageHeight}mm, Force solo: ${currentConfig.forceSolo}, Needs new page: ${needsNewPage}`);
        
        if (needsNewPage) {
          // Add current page if it has content
          addCurrentPageToPages();
        }
        
        // Determine if we should show badge/title after potential page break
        const showBadge = currentConfig.badgeTitle ? !shownBadgesOnCurrentPage.has(currentConfig.badgeTitle) : true;
        const showTitle = currentConfig.componentTitle ? !shownTitlesOnCurrentPage.has(currentConfig.componentTitle) : true;
        
        // Add component to current page (static components don't affect margin flag)
        currentPageComponents.push(renderComponent(currentConfig, componentIndex, 0, showBadge, showTitle));
        currentPageHeight += componentHeight;
        
        // Mark badge and title as shown on current page
        if (currentConfig.badgeTitle) {
          shownBadgesOnCurrentPage.add(currentConfig.badgeTitle);
        }
        if (currentConfig.componentTitle) {
          shownTitlesOnCurrentPage.add(currentConfig.componentTitle);
        }
        
        // If forceSolo is true, finalize this page immediately
        if (currentConfig.forceSolo) {
          addCurrentPageToPages();
        }
        
      } else if (currentConfig.componentType === 'dynamic') {
        const componentHeight = getComponentHeight(componentIndex);
        
        // console.log(`🔀 Dynamic component - Height: ${componentHeight}mm`);
        // console.log(`📐 Adjusted page height for dynamic component: ${pageHeight}mm (original: ${orientation === 'Portrait' ? PAGE_HEIGHT_PORTRAIT : PAGE_HEIGHT_LANDSCAPE}mm)`);
        
        // Check if component fits on current page
        if (currentPageHeight + componentHeight <= pageHeight) {
          // console.log(`➕ Adding dynamic component to current page (height will be ${currentPageHeight + componentHeight}mm)`);
          
          // Determine if we should show badge/title on current page
          const showBadge = currentConfig.badgeTitle ? !shownBadgesOnCurrentPage.has(currentConfig.badgeTitle) : true;
          const showTitle = currentConfig.componentTitle ? !shownTitlesOnCurrentPage.has(currentConfig.componentTitle) : true;
          
          currentPageComponents.push(renderComponent(currentConfig, componentIndex, 0, showBadge, showTitle));
          currentPageHeight += componentHeight;
          currentPageHasDynamic = true; // Mark this page as having dynamic content
          
          // Mark badge and title as shown on current page
          if (currentConfig.badgeTitle) {
            shownBadgesOnCurrentPage.add(currentConfig.badgeTitle);
          }
          if (currentConfig.componentTitle) {
            shownTitlesOnCurrentPage.add(currentConfig.componentTitle);
          }
        } else {
          // console.log(`📄 Creating new page for dynamic component`);
          
          // Finalize current page if it has content
          if (currentPageComponents.length > 0) {
            addCurrentPageToPages();
          }
          
          // Add component to new page (badge/title will show since it's a new page with reset Sets)
          const showBadge = currentConfig.badgeTitle ? !shownBadgesOnCurrentPage.has(currentConfig.badgeTitle) : true;
          const showTitle = currentConfig.componentTitle ? !shownTitlesOnCurrentPage.has(currentConfig.componentTitle) : true;
          
          currentPageComponents.push(renderComponent(currentConfig, componentIndex, 0, showBadge, showTitle));
          currentPageHeight = componentHeight;
          currentPageHasDynamic = true; // Mark this new page as having dynamic content
          
          // Mark badge and title as shown on this new page
          if (currentConfig.badgeTitle) {
            shownBadgesOnCurrentPage.add(currentConfig.badgeTitle);
          }
          if (currentConfig.componentTitle) {
            shownTitlesOnCurrentPage.add(currentConfig.componentTitle);
          }
        }
        
        // Check if next component can fit on current page
        if (componentIndex + 1 < componentsList.length) {
          const nextComponentHeight = getComponentHeight(componentIndex + 1);
          
          if (currentPageHeight + nextComponentHeight > pageHeight) {
            // console.log(`🚀 Next component won't fit, starting new page`);
            addCurrentPageToPages(); // Start fresh page for next component
          }
        }
      }
      
      componentIndex++;
    }
    
    // Add any remaining components to final page
    addCurrentPageToPages();
    
    // console.log(`🎯 Final result: Generated ${pages.length} pages`);
    
    return pages;
  };

  return (
    <div className="bg-[#EFF5FD] flex items-center justify-center flex-col">
       {isDataReady && <div id="dataReady"></div>}
      {renderPages()}
    </div>
  );
};

export default PrintPageRenderer;