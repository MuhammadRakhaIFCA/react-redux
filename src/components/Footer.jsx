import { ContactMeButton } from "./ContactMeButton"

export const Footer = () => {
    return (
        <footer className="min-h-16 py-8 px-20 mt-20 border-t flex items-center justify-between">
            <p className="text-xl font-bold">VoidFNC copyright 2024</p>
            <ContactMeButton>
                Contact Me
            </ContactMeButton>
        </footer>
    )
}