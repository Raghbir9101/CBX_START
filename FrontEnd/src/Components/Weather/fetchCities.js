import { debounce } from '@mui/material';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBoSjcDuvtHBrnP_pzIgZzgxHNUCeAzhwU';

let autocompleteService = null;

const loadScript = (src, position, id) => {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
};

export const initGoogleMapsScript = (callback) => {
  if (typeof window !== 'undefined' && !document.querySelector('#google-maps')) {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
      document.querySelector('head'),
      'google-maps',
      callback
    );
  } else if (typeof window !== 'undefined') {
    callback();
  }
};

export const fetchCities = debounce((input, callback) => {
  if (!autocompleteService && window.google) {
    autocompleteService = new window.google.maps.places.AutocompleteService();
  }
  if (autocompleteService) {
    autocompleteService.getPlacePredictions({ input }, callback);
  }
}, 400);
