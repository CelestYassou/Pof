
import { ClimbRoute, ClimbingSpot, UserProfile } from '../types';
import { MOCK_USER, MOCK_SPOTS } from '../constants';

const KEYS = {
  ROUTES: 'vp_routes',
  SPOTS: 'vp_spots',
  PROFILE: 'vp_profile'
};

export const storage = {
  getRoutes: (): ClimbRoute[] => {
    const data = localStorage.getItem(KEYS.ROUTES);
    return data ? JSON.parse(data) : [];
  },
  saveRoute: (route: ClimbRoute) => {
    const routes = storage.getRoutes();
    localStorage.setItem(KEYS.ROUTES, JSON.stringify([route, ...routes]));
  },
  getSpots: (): ClimbingSpot[] => {
    const data = localStorage.getItem(KEYS.SPOTS);
    return data ? JSON.parse(data) : MOCK_SPOTS;
  },
  saveSpot: (spot: ClimbingSpot) => {
    const spots = storage.getSpots();
    localStorage.setItem(KEYS.SPOTS, JSON.stringify([...spots, spot]));
  },
  getProfile: (): UserProfile => {
    const data = localStorage.getItem(KEYS.PROFILE);
    return data ? JSON.parse(data) : MOCK_USER;
  },
  updateProfile: (profile: UserProfile) => {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  }
};
