import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { profileInfo } from '@/data/profile';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

export function SEOHead({ 
  title, 
  description, 
  image,
  type = 'website'
}: SEOHeadProps) {
  const location = useLocation();
  
  const fullTitle = title 
    ? `${title} | ${profileInfo.name}` 
    : `${profileInfo.name} - ${profileInfo.tagline}`;
  
  const fullDescription = description || profileInfo.heroIntroduction;
  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}${location.pathname}`;

  useEffect(() => {
    document.title = fullTitle;

    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMetaTag('description', fullDescription);
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', fullDescription, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', fullUrl, true);
    const absoluteImage = image
      ? image.startsWith('http') ? image : `${baseUrl}${image}`
      : null;
    if (absoluteImage) updateMetaTag('og:image', absoluteImage, true);
    updateMetaTag('og:site_name', profileInfo.name, true);
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', fullDescription);
    if (absoluteImage) updateMetaTag('twitter:image', absoluteImage);
    updateMetaTag('author', profileInfo.name);
    updateMetaTag('keywords', 'web designer seattle, web developer redmond wa, local business websites, small business website design, Macrae Myint, web design washington state');

    // Self-referencing canonical link per route
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);
  }, [fullTitle, fullDescription, fullUrl, image, type]);

  return null;
}
