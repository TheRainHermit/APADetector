import { useContext, useMemo } from 'react';
import I18N from './index';
import LanguageContext from '../context/LanguageContext.jsx';

// Helper function to get nested object properties using dot notation
const getNestedValue = (obj, path) => {
    return path.split('.').reduce((o, k) => (o || {})[k], obj);
};

// Helper function for string interpolation
export const interpolate = (str, vars = {}) => {
    if (!str || typeof str !== 'string') return str;
    return str.replace(/\{([^}]+)\}/g, (match, key) => vars[key.trim()] || match);
};

const useT = () => {
    const { language } = useContext(LanguageContext);
    
    // Memoize the translation function to prevent unnecessary re-renders
    const t = useMemo(() => {
        return (key, vars) => {
            if (!key) return '';
            
            // Get the translation for the current language
            let translation = getNestedValue(I18N[language] || {}, key);
            
            // Fallback to Spanish if translation is missing and not already in Spanish
            if (translation === undefined && language !== 'es') {
                translation = getNestedValue(I18N.es || {}, key);
            }
            
            // If still no translation found, return the key in development for easier debugging
            if (translation === undefined) {
                if (process.env.NODE_ENV === 'development') {
                    console.warn(`[i18n] Missing translation for key: ${key}`);
                }
                return key;
            }
            
            // Handle array translations (for lists, paragraphs, etc.)
            if (Array.isArray(translation)) {
                return translation.map(item => 
                    typeof item === 'string' ? interpolate(item, vars) : item
                );
            }
            
            // Handle string interpolation
            if (typeof translation === 'string' && vars) {
                return interpolate(translation, vars);
            }
            
            return translation;
        };
    }, [language]);
    
    return t;
};

export default useT;