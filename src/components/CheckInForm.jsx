import React, { useState } from 'react';
import { calculateSaju } from '../utils/sajuCalculator';

const CheckInForm = ({ onAnalyze }) => {
    const [formData, setFormData] = useState({
        name: '',
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        hour: 12, // default noon
        minute: 0,
        calendarType: 'solar' // or 'lunar'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 1. Calculate Saju pillars
        const result = calculateSaju(
            parseInt(formData.year),
            parseInt(formData.month),
            parseInt(formData.day),
            parseInt(formData.hour),
            formData.calendarType === 'lunar'
        );

        // 2. Pass data up to parent
        onAnalyze({
            guestName: formData.name,
            birthDate: `${formData.year}-${formData.month}-${formData.day}`,
            ...result
        });
    };

    return (
        <div className="card fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>Guest Check-In</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                게스트의 생년월일시를 입력하여 운명 맞춤형 객실을 배정합니다.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>게스트 성함 (Guest Name)</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="홍길동"
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    <div className="input-group">
                        <label>년 (Year)</label>
                        <input type="number" name="year" value={formData.year} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>월 (Month)</label>
                        <input type="number" name="month" value={formData.month} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>일 (Day)</label>
                        <input type="number" name="day" value={formData.day} onChange={handleChange} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div className="input-group">
                        <label>시간 (Hour 0-23)</label>
                        <input type="number" name="hour" value={formData.hour} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>양력/음력</label>
                        <select name="calendarType" value={formData.calendarType} onChange={handleChange}>
                            <option value="solar">양력 (Solar)</option>
                            <option value="lunar">음력 (Lunar)</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                    매칭 분석 시작 (Analyze & Match)
                </button>
            </form>
        </div>
    );
};

export default CheckInForm;
