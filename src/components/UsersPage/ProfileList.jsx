import React, { useState } from 'react';
import ProfilePage from './ProfilePage';
import AddConge from '../common/AddConge';
import './ProfileList.css';

const ProfileList = ({ userId }) => {
    const [activeSection, setActiveSection] = useState('personal-info');
    const [serviceOption, setServiceOption] = useState(null);

    const renderServiceOptions = () => {
        switch (serviceOption) {
            case 'leave-request':
                return <AddConge userId={userId} />; // Render the AddConge component
            case 'resignation-request':
                return <p>Formulaire de demande de démission...</p>;
            case 'salary-increase-request':
                return <p>Formulaire de demande d'augmentation de salaire...</p>;
            default:
                return (
                    <div className="service-buttons">
                        <button className="service-button" onClick={() => setServiceOption('leave-request')}>
                            Demande de congé
                        </button>
                        <button className="service-button" onClick={() => setServiceOption('resignation-request')}>
                            Demande de démission
                        </button>
                        <button className="service-button" onClick={() => setServiceOption('salary-increase-request')}>
                            Demande d'augmentation de salaire
                        </button>
                    </div>
                );
        }
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'personal-info':
                return <ProfilePage />;
            case 'services':
                return (
                    <section>
                        <h2>Services</h2>
                        {renderServiceOptions()}
                    </section>
                );
            case 'communication':
                return (
                    <section>
                        <h2>Messages internes</h2>
                        <p>...</p>
                    </section>
                );
            default:
                return null;
        }
    };

    return (
        <div className="profile-container">
            <aside className="sidebar">
                <ul className="sidebar-list">
                    <li className="sidebar-item">
                        <button onClick={() => setActiveSection('personal-info')}>
                            Informations Personnelles
                        </button>
                    </li>
                    <li className="sidebar-item">
                        <button onClick={() => setActiveSection('services')}>
                            Services
                        </button>
                    </li>
                    <li className="sidebar-item">
                        <button onClick={() => setActiveSection('communication')}>
                            Messages internes
                        </button>
                    </li>
                </ul>
            </aside>
            <main className="main-content">
                {renderSection()}
            </main>
        </div>
    );
};

export default ProfileList;
