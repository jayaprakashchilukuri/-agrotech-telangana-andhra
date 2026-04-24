import {
  buildFarmerAdvisories,
  buildWeatherAlerts,
  describeWeatherCode,
  getNearestSupportedCity,
} from './agriApi';

describe('agriApi helpers', () => {
  it('maps weather code to readable label and icon', () => {
    const info = describeWeatherCode(63);
    expect(info.label).toBe('Rain');
    expect(info.icon).toBe('🌧');
  });

  it('returns nearest supported city for coordinates', () => {
    const nearest = getNearestSupportedCity(17.40, 78.48);
    expect(nearest).toBeTruthy();
    expect(nearest.city).toBe('Hyderabad');
  });

  it('builds severe weather advisories with crop-stage context', () => {
    const actions = buildFarmerAdvisories(
      {
        rain7day: 45,
        temp: 39,
        humidity: 84,
        wind: 30,
        uv: 10,
      },
      {
        crop: 'paddy',
        stage: 'tillering',
        district: 'Warangal',
      }
    );

    expect(actions.length).toBeGreaterThan(3);
    expect(actions.join(' ')).toMatch(/District context/i);
    expect(actions.join(' ')).toMatch(/Paddy tillering/i);
  });

  it('builds alert cards from weather snapshots', () => {
    const alerts = buildWeatherAlerts([
      {
        city: 'Kurnool',
        rain7day: 5,
        temp: 40,
        humidity: 70,
        wind: 20,
        source: 'Open-Meteo',
      },
    ]);

    expect(alerts.length).toBeGreaterThan(0);
    expect(alerts[0]).toHaveProperty('title');
    expect(alerts[0]).toHaveProperty('body');
  });
});
