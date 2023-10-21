import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import {askToChangeNetwork} from "../../api/index.js";

export default function Dropdown() {
    const [selectedNetwork, setSelectedNetwork] = useState("Mantle Testnet");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const networks = ['Mantle Testnet', 'Scroll Testnet'];

    useEffect(() => {
        function handleDocumentClick(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleDocumentClick);
        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                >
                    <span className="mr-1">{selectedNetwork || "Select Network"}</span>
                    <FontAwesomeIcon icon={faArrowDown} />
                </button>
            </div>

            <div
                className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                style={{ display: isOpen ? 'block' : 'none' }}
            >
                <div className="py-1">
                    {networks.map((network, index) => (
                        <a
                            key={index}
                            onClick={() => {
                                setSelectedNetwork(network);
                                setIsOpen(false);
                                askToChangeNetwork(index)
                            }}
                            className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-dark_777"
                        >
                            {network}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}