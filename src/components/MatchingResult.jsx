import React from 'react';
import { motion } from 'framer-motion';
import { ROOM_INVENTORY, WELCOME_GUIDE } from '../utils/airbnbData';
import { FIVE_ELEMENTS } from '../utils/constants';

const MatchingResult = ({ analysisData, onReset }) => {
    const { guestName, elements, yearPillar, monthPillar, dayPillar, timePillar } = analysisData;

    // 1. Identify Lacking Element (Logic: Find min count)
    let minCount = Infinity;
    let lackingElement = null;

    // Priority: If count is 0, it's definitely lacking. If all have some, pick lowest.
    // Order of check might matter, but for now simple min.
    Object.entries(elements).forEach(([el, count]) => {
        if (count < minCount) {
            minCount = count;
            lackingElement = el;
        }
    });

    const matchedRoom = ROOM_INVENTORY.find(room => room.element === lackingElement);
    const guide = WELCOME_GUIDE[lackingElement];
    const elementInfo = FIVE_ELEMENTS[lackingElement];

    return (
        <div className="fade-in">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2rem' }}>Destiny Match Found</h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    {guestName}님을 위한 오행 맞춤 분석 결과입니다.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Left Col: Saju & Diagnosis */}
                <motion.div
                    className="card"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3>사주 원국 분석 (Four Pillars)</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', background: 'var(--bg-secondary)', padding: '15px', borderRadius: '8px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>시주</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{timePillar}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>일주</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{dayPillar}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>월주</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{monthPillar}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>연주</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{yearPillar}</div>
                        </div>
                    </div>

                    <h3>진단 결과</h3>
                    <p>
                        현재 <strong>{elementInfo.ko}</strong> 기운이 가장 부족합니다.<br />
                        균형을 맞추기 위해 <strong>{elementInfo.direction}</strong> 방향과 <strong>{guide.color}</strong> 기운이 필요합니다.
                    </p>
                </motion.div>

                {/* Right Col: Room Recommendation */}
                <motion.div
                    className="card"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{ border: `1px solid ${elementInfo.color}` }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3>추천 객실 (Recommended Room)</h3>
                        <span style={{
                            background: elementInfo.color,
                            color: '#fff',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '0.8rem'
                        }}>
                            Best Match
                        </span>
                    </div>

                    <h2 style={{ color: elementInfo.color, margin: '10px 0' }}>{matchedRoom.name}</h2>
                    <p>{matchedRoom.description}</p>
                    <ul style={{ marginTop: '15px', paddingLeft: '20px', color: 'var(--text-secondary)' }}>
                        {matchedRoom.features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                </motion.div>
            </div>

            {/* Bottom Row: Welcome Guide */}
            <motion.div
                className="card"
                style={{ marginTop: '24px' }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <h3>🎁 VIP 웰컴 가이드 (Welcome Guide)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '15px' }}>
                    <div>
                        <strong style={{ color: 'var(--accent-gold)' }}>🍵 웰컴 티</strong>
                        <p>{guide.tea}</p>
                        <small style={{ color: 'var(--text-secondary)' }}>{guide.teaDesc}</small>
                    </div>
                    <div>
                        <strong style={{ color: 'var(--accent-gold)' }}>🌿 추천 향기</strong>
                        <p>{guide.aroma}</p>
                    </div>
                    <div>
                        <strong style={{ color: 'var(--accent-gold)' }}>🧘 추천 활동</strong>
                        <p>{guide.activity}</p>
                    </div>
                    <div>
                        <strong style={{ color: 'var(--accent-gold)' }}>🎵 힐링 사운드</strong>
                        <p>{guide.music}</p>
                    </div>
                </div>
            </motion.div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <button onClick={onReset} style={{ background: 'transparent', border: '1px solid var(--text-secondary)', color: 'var(--text-primary)' }}>
                    새로운 게스트 등록
                </button>
            </div>
        </div>
    );
};

export default MatchingResult;
