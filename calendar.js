window.onload = () => {
  const times = [
    { id: 0, value: '00:00' },
    { id: 1, value: '00:30' },
    { id: 2, value: '01:00' },
    { id: 3, value: '01:30' },
    { id: 4, value: '02:00' },
    { id: 5, value: '02:30' },
    { id: 6, value: '03:00' },
    { id: 7, value: '03:30' },
    { id: 8, value: '04:00' },
    { id: 9, value: '04:30' },
    { id: 10, value: '05:00' },
    { id: 11, value: '05:30' },
    { id: 12, value: '06:00' },
    { id: 13, value: '07:00' },
    { id: 14, value: '07:30' },
    { id: 15, value: '08:00' },
    { id: 16, value: '08:30' },
    { id: 17, value: '09:00' },
    { id: 18, value: '09:30' },
    { id: 19, value: '10:00' },
    { id: 20, value: '10:30' },
    { id: 21, value: '11:00' },
    { id: 22, value: '11:30' },
    { id: 23, value: '12:00' },
    { id: 24, value: '12:30' },
    { id: 25, value: '13:00' },
    { id: 26, value: '13:30' },
    { id: 27, value: '14:00' },
    { id: 28, value: '14:30' },
    { id: 29, value: '15:00' },
    { id: 30, value: '15:30' },
    { id: 31, value: '16:00' },
    { id: 32, value: '16:30' },
    { id: 33, value: '17:00' },
    { id: 34, value: '17:30' },
    { id: 35, value: '18:00' },
    { id: 36, value: '18:30' },
    { id: 37, value: '19:00' },
    { id: 38, value: '19:30' },
    { id: 39, value: '20:00' },
    { id: 40, value: '20:30' },
    { id: 41, value: '21:00' },
    { id: 42, value: '21:30' },
    { id: 43, value: '22:00' },
    { id: 44, value: '22:30' },
    { id: 45, value: '23:00' },
    { id: 46, value: '23:30' }
  ];

  let calendar = document.getElementById('calendar');
  times.forEach(element => {
    let newEl = document.createElement('div');
    newEl.id = element['id'];
    newEl.className = 'col-day day';
    newEl.innerHTML = element['value'];
    calendar.appendChild(newEl);

    for (let i = 0; i < 7; i++) {
      let emptyEl = document.createElement('div');
      emptyEl.id = element['id'] + '-' + i;
      emptyEl.className = 'day booking-day';
      let value = element['id'];

      emptyEl.addEventListener('click', () => {
        AddApointment(value, i);
      });
      let innerEl = document.createElement('span');
      innerEl.className = 'tooltip';
      emptyEl.appendChild(innerEl);
      calendar.appendChild(emptyEl);
    }
  });
};
