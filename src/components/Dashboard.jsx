import React, { useState, useEffect } from 'react';
import { getGuests, searchGuests, clearGuests } from '../utils/storage';
import { motion } from 'framer-motion';

const Dashboard = ({ onNewCheckIn }) => {
    const [guests, setGuests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setGuests(getGuests());
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        setGuests(searchGuests(term));
    };

    const handleClear = () => {
        if (window.confirm('모든 게스트 기록을 삭제하시겠습니까?')) {
            clearGuests();
            setGuests([]);
        }
    }

    return (
        <div className="container fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h1>Guest Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>오늘의 체크인 예정 및 사주 매칭 현황</p>
                </div>
                <button className="btn-primary" onClick={onNewCheckIn}>
                    + New Check-In
                </button>
            </div>

            <div className="card" style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="게스트 이름 검색..."
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ maxWidth: '400px' }}
                />
            </div>

            <div style={{ display: 'grid', gap: '15px' }}>
                {guests.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                        <p>등록된 게스트가 없습니다. 체크인을 시작해주세요.</p>
                    </div>
                ) : (
                    guests.map((guest, idx) => (
                        <motion.div
                            key={guest.id || idx}
                            className="card"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <div>
                                <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>{guest.guestName}</h3>
                                <small style={{ color: 'var(--text-secondary)' }}>
                                    방문일: {new Date(guest.visitDate).toLocaleDateString()} | 생년월일: {guest.birthDate}
                                </small>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: 'bold', color: 'var(--accent-gold)' }}>
                                    {guest.room ? `Room ${guest.room.id}` : '매칭 완료'}
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {guests.length > 0 && (
                <div style={{ marginTop: '20px', textAlign: 'right' }}>
                    <button onClick={handleClear} style={{ background: 'transparent', color: 'var(--accent-fire)', fontSize: '0.9rem' }}>
                        기록 초기화
                    </button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
