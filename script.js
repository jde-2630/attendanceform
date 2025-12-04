document.getElementById('date').value = new Date().toISOString().split('T')[0];

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');

    if (sectionId !== 'recordsSection') {
        document.getElementById('recordsDisplay').style.display = 'none';
        document.getElementById('password').value = '';
        document.getElementById('passwordError').style.display = 'none';
    }
}

function submitForm() {
    const studentName = document.getElementById('studentName').value.trim();
    const gradeLevel = document.getElementById('gradeLevel').value;
    const lrn = document.getElementById('lrn').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const overallAttendance = document.getElementById('overallAttendance').value;
    const date = document.getElementById('date').value;
    const errorMessage = document.getElementById('errorMessage');

    if (!studentName || !gradeLevel || !lrn || !subject || !overallAttendance || !date) {
        errorMessage.textContent = "Please fill in all fields.";
        errorMessage.style.display = 'block';
        return;
    }

    if (isNaN(lrn)) {
        errorMessage.textContent = "LRN must be a number.";
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';

    let records = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
    records.push({ studentName, gradeLevel, lrn, subject, overallAttendance, date });
    localStorage.setItem('attendanceRecords', JSON.stringify(records));

    document.getElementById('attendanceForm').reset();
    document.getElementById('date').value = new Date().toISOString().split('T')[0];

    showSection('submittedSection');
}

function checkPassword(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    const passwordError = document.getElementById('passwordError');

    if (password === 'jdej') {
        passwordError.style.display = 'none';
        document.getElementById('recordsDisplay').style.display = 'block';
        displayRecords();
    } else {
        passwordError.textContent = 'Incorrect password. Please try again.';
        passwordError.style.display = 'block';
    }
}

function displayRecords() {
    const records = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
    const recordsContainer = document.getElementById('recordsContainer');
    const noRecords = document.getElementById('noRecords');

    recordsContainer.innerHTML = '';

    if (records.length === 0) {
        noRecords.style.display = 'block';
        return;
    }

    noRecords.style.display = 'none';

    const gradeGroups = {};
    records.forEach(record => {
        if (!gradeGroups[record.gradeLevel]) {
            gradeGroups[record.gradeLevel] = [];
        }
        gradeGroups[record.gradeLevel].push(record);
    });

    for (const grade in gradeGroups) {
        const gradeSection = document.createElement('div');
        gradeSection.className = 'grade-section';
        gradeSection.innerHTML = `<h3>${grade} Records</h3>`;

        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Student's Name</th>
                    <th>LRN</th>
                    <th>Subject</th>
                    <th>Overall Attendance</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = table.querySelector('tbody');
        gradeGroups[grade].forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.studentName}</td>
                <td>${record.lrn}</td>
                <td>${record.subject}</td>
                <td>${record.overallAttendance}</td>
                <td>${record.date}</td>
            `;
            tbody.appendChild(row);
        });

        gradeSection.appendChild(table);
        recordsContainer.appendChild(gradeSection);
    }
}

function resetRecords() {
    if (confirm('Are you sure you want to reset all records? This cannot be undone.')) {
        localStorage.removeItem('attendanceRecords');
        displayRecords();
    }
}
