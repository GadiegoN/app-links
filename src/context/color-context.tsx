import { createContext, useState, useEffect, ReactNode, useContext, FC } from 'react';

interface ColorContextType {
    buttonColor: string;
    setButtonColor: (color: string) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [buttonColor, setButtonColor] = useState<string>('');

    useEffect(() => {
        const savedColor = localStorage.getItem('buttonColor');
        if (savedColor) {
            setButtonColor(savedColor);
        }
    }, []);

    const handleSetButtonColor = (color: string) => {
        setButtonColor(color);
        localStorage.setItem('buttonColor', color);
    };

    return (
        <ColorContext.Provider value={{ buttonColor, setButtonColor: handleSetButtonColor }}>
            {children}
        </ColorContext.Provider>
    );
};

export const useColor = (): ColorContextType => {
    const context = useContext(ColorContext);
    if (context === undefined) {
        throw new Error('useColor must be used within a ColorProvider');
    }
    return context;
};