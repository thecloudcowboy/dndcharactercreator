import { r1, createR1App } from 'r1-create';

// Fantasy D&D Theme Styles
const THEME = {
  colors: {
    primary: '#8B4513',
    secondary: '#DAA520',
    background: '#2C1810',
    surface: '#3E2723',
    text: '#F5DEB3',
    textDark: '#8B7355',
    accent: '#CD853F',
    danger: '#8B0000',
    success: '#228B22',
    border: '#DAA520',
  },
};

// Default character fields and values
const DEFAULT_FIELDS = {
  race: {
    name: 'Race',
    values: [
      'Aasimar', 'Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Goliath',
      'Halfling', 'Half-Elf', 'Half-Orc', 'Human', 'Orc', 'Tiefling'
    ],
    isDefault: true
  },
  class: {
    name: 'Class',
    values: [
      'Artificer', 'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter',
      'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'
    ],
    isDefault: true
  },
  gender: {
    name: 'Gender',
    values: ['Male', 'Female', 'Non-Binary'],
    isDefault: true
  },
  equipment: {
    name: 'Equipment',
    values: [
      'Sword and Shield', 'Daggers', 'Single Axe', 'Two Axes',
      'Wizard Staff', 'Unequipped'
    ],
    isDefault: true
  },
  bodyType: {
    name: 'Body Type',
    values: ['Muscular', 'Normal', 'Scrawny'],
    isDefault: true
  },
  emotion: {
    name: 'Emotion',
    values: ['Serious', 'Angry', 'Happy', 'Sad', 'Sad and Sobbing', 'Insane'],
    isDefault: true
  },
  artStyle: {
    name: 'Art Style',
    values: ['Fantasy', 'Anime', 'Gritty and Realistic', 'Caricature'],
    isDefault: true
  }
};

// Storage keys
const STORAGE_KEYS = {
  CUSTOM_FIELDS: 'dnd_custom_fields',
  CUSTOM_VALUES: 'dnd_custom_values',
  SELECTED_VALUES: 'dnd_selected_values'
};

// App state
let characterFields = { ...DEFAULT_FIELDS };
let selectedValues = {};
let customFields = {};
let customValues = {};
let appContainer = null;
let isR1Device = false;

// Browser fallback storage
const browserStorage = {
  async getItem(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  async setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Get storage (R1 or browser)
function getStorage() {
  if (isR1Device && r1?.storage?.plain) {
    return r1.storage.plain;
  }
  return browserStorage;
}

// Load custom data from storage
async function loadCustomData() {
  try {
    const storage = getStorage();
    const storedFields = await storage.getItem(STORAGE_KEYS.CUSTOM_FIELDS);
    const storedValues = await storage.getItem(STORAGE_KEYS.CUSTOM_VALUES);
    const storedSelected = await storage.getItem(STORAGE_KEYS.SELECTED_VALUES);
    
    if (storedFields) {
      customFields = storedFields;
      characterFields = { ...DEFAULT_FIELDS, ...customFields };
    }
    
    if (storedValues) {
      customValues = storedValues;
      Object.keys(customValues).forEach(fieldKey => {
        if (characterFields[fieldKey]) {
          characterFields[fieldKey].values = [
            ...new Set([...characterFields[fieldKey].values, ...customValues[fieldKey]])
          ];
        }
      });
    }
    
    if (storedSelected) {
      selectedValues = storedSelected;
    }
  } catch (error) {
    console.error('Error loading custom data:', error);
  }
}

// Save custom data to storage
async function saveCustomData() {
  try {
    const storage = getStorage();
    await storage.setItem(STORAGE_KEYS.CUSTOM_FIELDS, customFields);
    await storage.setItem(STORAGE_KEYS.CUSTOM_VALUES, customValues);
    await storage.setItem(STORAGE_KEYS.SELECTED_VALUES, selectedValues);
  } catch (error) {
    console.error('Error saving custom data:', error);
  }
}

// Generate the D&D character prompt
function generateCharacterPrompt() {
  const characterParts = [];
  
  if (selectedValues.gender) characterParts.push(`a ${selectedValues.gender.toLowerCase()}`);
  if (selectedValues.race) characterParts.push(selectedValues.race.toLowerCase());
  if (selectedValues.class) characterParts.push(selectedValues.class.toLowerCase());
  
  const descriptors = [];
  if (selectedValues.bodyType) descriptors.push(selectedValues.bodyType.toLowerCase());
  if (selectedValues.emotion) descriptors.push(`with a ${selectedValues.emotion.toLowerCase()} expression`);
  
  let characterDescription = characterParts.join(' ');
  
  if (descriptors.length > 0) {
    characterDescription += ` who is ${descriptors.join(' and ')}`;
  }
  
  if (selectedValues.equipment && selectedValues.equipment !== 'Unequipped') {
    characterDescription += `, wielding ${selectedValues.equipment.toLowerCase()}`;
  }
  
  Object.keys(selectedValues).forEach(key => {
    if (!DEFAULT_FIELDS[key] && selectedValues[key]) {
      characterDescription += `, ${characterFields[key].name.toLowerCase()}: ${selectedValues[key].toLowerCase()}`;
    }
  });
  
  const artStyle = selectedValues.artStyle ? selectedValues.artStyle.toLowerCase() : 'fantasy';
  const prompt = `Take a picture and turn the subject into a Dungeons and Dragons character who is ${characterDescription} in a ${artStyle} art style`;
  
  return prompt;
}

// Create styled elements
function createTitle(text) {
  const title = document.createElement('h1');
  title.textContent = text;
  title.style.cssText = `
    font-size: 22px;
    font-weight: bold;
    color: ${THEME.colors.secondary};
    text-align: center;
    margin-bottom: 15px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
    letter-spacing: 1px;
  `;
  return title;
}

function createText(text, italic = false) {
  const p = document.createElement('p');
  p.textContent = text;
  p.style.cssText = `
    font-size: 13px;
    color: ${THEME.colors.text};
    text-align: center;
    margin-bottom: 15px;
    ${italic ? 'font-style: italic;' : ''}
  `;
  return p;
}

function createSelect(label, options, value, onChange) {
  const container = document.createElement('div');
  container.style.marginBottom = '12px';
  
  const labelEl = document.createElement('label');
  labelEl.textContent = label;
  labelEl.style.cssText = `
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: ${THEME.colors.secondary};
    margin-bottom: 5px;
  `;
  
  const select = document.createElement('select');
  select.style.cssText = `
    width: 100%;
    padding: 8px;
    background-color: ${THEME.colors.surface};
    color: ${THEME.colors.text};
    border: 2px solid ${THEME.colors.border};
    border-radius: 6px;
    font-family: Georgia, serif;
    font-size: 14px;
  `;
  
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = `-- Select ${label} --`;
  select.appendChild(defaultOption);
  
  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt;
    option.textContent = opt;
    if (opt === value) option.selected = true;
    select.appendChild(option);
  });
  
  select.addEventListener('change', (e) => onChange(e.target.value));
  
  container.appendChild(labelEl);
  container.appendChild(select);
  return container;
}

function createInput(label, placeholder, onChange) {
  const container = document.createElement('div');
  container.style.marginBottom = '12px';
  
  const labelEl = document.createElement('label');
  labelEl.textContent = label;
  labelEl.style.cssText = `
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: ${THEME.colors.secondary};
    margin-bottom: 5px;
  `;
  
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = placeholder;
  input.style.cssText = `
    width: 100%;
    padding: 8px;
    background-color: ${THEME.colors.surface};
    color: ${THEME.colors.text};
    border: 2px solid ${THEME.colors.border};
    border-radius: 6px;
    font-family: Georgia, serif;
    font-size: 14px;
  `;
  
  input.addEventListener('input', (e) => onChange(e.target.value));
  
  container.appendChild(labelEl);
  container.appendChild(input);
  return container;
}

function createButton(text, onClick, style = 'primary') {
  const button = document.createElement('button');
  button.textContent = text;
  
  const styles = {
    primary: `background-color: ${THEME.colors.primary}; color: ${THEME.colors.secondary};`,
    success: `background-color: ${THEME.colors.success}; color: ${THEME.colors.text};`,
    secondary: `background-color: ${THEME.colors.accent}; color: ${THEME.colors.text};`,
    danger: `background-color: ${THEME.colors.danger}; color: ${THEME.colors.text};`,
    neutral: `background-color: ${THEME.colors.surface}; color: ${THEME.colors.text}; border-color: ${THEME.colors.textDark};`
  };
  
  button.style.cssText = `
    width: 100%;
    padding: 10px;
    margin-top: 8px;
    border: 2px solid ${THEME.colors.border};
    border-radius: 6px;
    font-family: Georgia, serif;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    box-shadow: 0 3px 5px rgba(0,0,0,0.5);
    ${styles[style] || styles.primary}
  `;
  
  button.addEventListener('click', onClick);
  return button;
}

// Screen: Main Character Creation
function renderMainScreen() {
  const container = document.createElement('div');
  
  container.appendChild(createTitle('⚔️ Create Your D&D Character ⚔️'));
  container.appendChild(createText('Choose your character\'s attributes from the ancient scrolls below...', true));
  
  Object.keys(characterFields).forEach(fieldKey => {
    const field = characterFields[fieldKey];
    container.appendChild(
      createSelect(
        field.name,
        field.values,
        selectedValues[fieldKey] || '',
        (value) => {
          selectedValues[fieldKey] = value;
          saveCustomData();
        }
      )
    );
  });
  
  container.appendChild(
    createButton('🎨 Generate Character Image', async () => {
      if (Object.keys(selectedValues).length === 0) {
        alert('Please select at least one character attribute');
        return;
      }
      const prompt = generateCharacterPrompt();
      renderCameraScreen(prompt);
    }, 'primary')
  );
  
  container.appendChild(
    createButton('📜 Manage Custom Fields', () => {
      renderManageScreen();
    }, 'secondary')
  );
  
  appContainer.innerHTML = '';
  appContainer.appendChild(container);
}

// Screen: Camera
async function renderCameraScreen(prompt) {
  const container = document.createElement('div');
  
  container.appendChild(createTitle('📸 Capture Your Likeness'));
  container.appendChild(createText('The magic mirror awaits to transform you...', true));
  
  const promptText = createText(`Enchantment: ${prompt}`, true);
  promptText.style.fontSize = '11px';
  promptText.style.wordWrap = 'break-word';
  container.appendChild(promptText);
  
  const videoContainer = document.createElement('div');
  videoContainer.style.cssText = `
    width: 100%;
    height: 150px;
    background: #000;
    border: 2px solid ${THEME.colors.border};
    border-radius: 6px;
    margin: 15px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  `;
  
  // Try R1 camera first, then browser camera
  try {
    if (isR1Device && r1.camera) {
      const stream = await r1.camera.start({ facingMode: 'user' });
      const video = r1.camera.createVideoElement();
      video.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
      videoContainer.appendChild(video);
    } else {
      throw new Error('R1 camera not available');
    }
  } catch (r1Error) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.autoplay = true;
      video.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
      videoContainer.appendChild(video);
    } catch (browserError) {
      videoContainer.innerHTML = '<p style="color: #F5DEB3; font-size: 12px; padding: 10px; text-align: center;">Camera not available.<br>Will work on R1 device.</p>';
    }
  }
  
  container.appendChild(videoContainer);
  
  container.appendChild(
    createButton('✨ Capture & Generate', async () => {
      if (isR1Device) {
        try {
          await r1.llm.askLLMSpeak(prompt, true);
          alert('⚡ Character image generated and saved to your journal!');
        } catch (error) {
          alert('📸 Prompt:\n\n' + prompt);
        }
      } else {
        alert('📸 On R1 device, this would generate:\n\n' + prompt);
      }
      renderMainScreen();
    }, 'success')
  );
  
  container.appendChild(
    createButton('⬅️ Back', () => {
      renderMainScreen();
    }, 'neutral')
  );
  
  appContainer.innerHTML = '';
  appContainer.appendChild(container);
}

// Screen: Manage Fields
function renderManageScreen() {
  const container = document.createElement('div');
  
  container.appendChild(createTitle('📜 Customize Your Scrolls'));
  container.appendChild(createText('Modify the ancient texts to suit your needs', true));
  
  container.appendChild(createButton('✨ Add Custom Field', () => renderAddFieldScreen(), 'success'));
  container.appendChild(createButton('➕ Add Value to Field', () => renderAddValueScreen(), 'secondary'));
  container.appendChild(createButton('🗑️ Delete Custom Field', () => renderDeleteFieldScreen(), 'danger'));
  container.appendChild(createButton('❌ Delete Custom Value', () => renderDeleteValueScreen(), 'danger'));
  container.appendChild(createButton('⬅️ Back to Character Creation', () => renderMainScreen(), 'neutral'));
  
  appContainer.innerHTML = '';
  appContainer.appendChild(container);
}

// Screen: Add Field
function renderAddFieldScreen() {
  const container = document.createElement('div');
  let fieldKey = '';
  let fieldName = '';
  
  container.appendChild(createTitle('✨ Inscribe New Field'));
  container.appendChild(createText('Add a new attribute to your character scrolls', true));
  
  container.appendChild(createInput('Field Key (e.g., hairColor)', 'Enter field key', (val) => { fieldKey = val; }));
  container.appendChild(createInput('Field Name (e.g., Hair Color)', 'Enter field name', (val) => { fieldName = val; }));
  
  container.appendChild(
    createButton('✓ Add Field', async () => {
      if (!fieldKey || !fieldName) {
        alert('Please enter both field key and name');
        return;
      }
      
      if (!characterFields[fieldKey]) {
        customFields[fieldKey] = { name: fieldName, values: [], isDefault: false };
        characterFields[fieldKey] = customFields[fieldKey];
        await saveCustomData();
        alert('✨ Field added successfully!');
        renderManageScreen();
      } else {
        alert('⚠️ Field already exists');
      }
    }, 'success')
  );
  
  container.appendChild(createButton('Cancel', () => renderManageScreen(), 'neutral'));
  
  appContainer.innerHTML = '';
  appContainer.appendChild(container);
}

// Screen: Add Value
function renderAddValueScreen() {
  const container = document.createElement('div');
  let selectedField = '';
  let newValue = '';
  
  container.appendChild(createTitle('➕ Add New Option'));
  container.appendChild(createText('Expand the choices within an existing field', true));
  
  container.appendChild(
    createSelect(
      'Select Field',
      Object.keys(characterFields).map(key => characterFields[key].name),
      '',
      (value) => {
        selectedField = Object.keys(characterFields).find(key => characterFields[key].name === value);
      }
    )
  );
  
  container.appendChild(createInput('New Value', 'Enter new value', (val) => { newValue = val; }));
  
  container.appendChild(
    createButton('✓ Add Value', async () => {
      if (!selectedField || !newValue) {
        alert('Please select a field and enter a value');
        return;
      }
      
      if (!characterFields[selectedField].values.includes(newValue)) {
        if (!customValues[selectedField]) customValues[selectedField] = [];
        customValues[selectedField].push(newValue);
        characterFields[selectedField].values.push(newValue);
        await saveCustomData();
        alert('✨ Value added successfully!');
        renderManageScreen();
      } else {
        alert('⚠️ Value already exists');
      }
    }, 'success')
  );
  
  container.appendChild(createButton('Cancel', () => renderManageScreen(), 'neutral'));
  
  appContainer.innerHTML = '';
  appContainer.appendChild(container);
}

// Screen: Delete Field
function renderDeleteFieldScreen() {
  const container = document.createElement('div');
  const customFieldsList = Object.keys(customFields);
  
  if (customFieldsList.length === 0) {
    container.appendChild(createTitle('📜 No Custom Fields'));
    container.appendChild(createText('You have not created any custom fields yet'));
    container.appendChild(createButton('⬅️ Back', () => renderManageScreen(), 'neutral'));
  } else {
    let selectedField = '';
    
    container.appendChild(createTitle('🗑️ Remove Custom Field'));
    container.appendChild(createText('Erase a custom field from your scrolls', true));
    
    container.appendChild(
      createSelect(
        'Select Field to Delete',
        customFieldsList.map(key => customFields[key].name),
        '',
        (value) => {
          selectedField = Object.keys(customFields).find(key => customFields[key].name === value);
        }
      )
    );
    
    container.appendChild(
      createButton('🗑️ Delete Field', async () => {
        if (!selectedField) {
          alert('Please select a field to delete');
          return;
        }
        
        if (confirm(`⚠️ Are you sure you want to delete ${customFields[selectedField].name}?`)) {
          delete customFields[selectedField];
          delete characterFields[selectedField];
          delete customValues[selectedField];
          delete selectedValues[selectedField];
          await saveCustomData();
          alert('✓ Field deleted successfully!');
          renderManageScreen();
        }
      }, 'danger')
    );
    
    container.appendChild(createButton('Cancel', () => renderManageScreen(), 'neutral'));
  }
  
  appContainer.innerHTML = '';
  appContainer.appendChild(container);
}

// Screen: Delete Value
function renderDeleteValueScreen() {
  const container = document.createElement('div');
  const fieldsWithCustomValues = Object.keys(customValues).filter(
    key => customValues[key] && customValues[key].length > 0
  );
  
  if (fieldsWithCustomValues.length === 0) {
    container.appendChild(createTitle('📜 No Custom Values'));
    container.appendChild(createText('You have not added any custom values yet'));
    container.appendChild(createButton('⬅️ Back', () => renderManageScreen(), 'neutral'));
  } else {
    let selectedField = '';
    let selectedValue = '';
    let valueSelect = null;
    
    container.appendChild(createTitle('❌ Remove Custom Value'));
    container.appendChild(createText('Erase a custom value from a field', true));
    
    const fieldSelect = createSelect(
      'Select Field',
      fieldsWithCustomValues.map(key => characterFields[key].name),
      '',
      (value) => {
        selectedField = fieldsWithCustomValues.find(key => characterFields[key].name === value);
        selectedValue = '';
        
        if (valueSelect) valueSelect.remove();
        
        if (selectedField && customValues[selectedField]) {
          valueSelect = createSelect(
            'Select Value to Delete',
            customValues[selectedField],
            '',
            (val) => { selectedValue = val; }
          );
          container.insertBefore(valueSelect, container.children[container.children.length - 2]);
        }
      }
    );
    
    container.appendChild(fieldSelect);
    
    container.appendChild(
      createButton('❌ Delete Value', async () => {
        if (!selectedField || !selectedValue) {
          alert('Please select a field and value to delete');
          return;
        }
        
        if (confirm(`⚠️ Are you sure you want to delete "${selectedValue}"?`)) {
          const index = customValues[selectedField].indexOf(selectedValue);
          if (index > -1) {
            customValues[selectedField].splice(index, 1);
            const fieldIndex = characterFields[selectedField].values.indexOf(selectedValue);
            if (fieldIndex > -1) characterFields[selectedField].values.splice(fieldIndex, 1);
            if (selectedValues[selectedField] === selectedValue) selectedValues[selectedField] = null;
            await saveCustomData();
            alert('✓ Value deleted successfully!');
            renderManageScreen();
          }
        }
      }, 'danger')
    );
    
    container.appendChild(createButton('Cancel', () => renderManageScreen(), 'neutral'));
  }
  
  appContainer.innerHTML = '';
  appContainer.appendChild(container);
}

// Initialize app
async function initializeApp() {
  console.log('Initializing D&D Character Generator...');
  
  appContainer = document.getElementById('app');
  
  // Detect if running on R1 device
  isR1Device = typeof r1 !== 'undefined' && r1.storage && r1.camera;
  console.log('Running on R1 device:', isR1Device);
  
  await loadCustomData();
  
  appContainer.innerHTML = '';
  appContainer.appendChild(renderMainScreen());
  
  // Setup hardware events if on R1
  if (isR1Device) {
    try {
      r1.hardware.on('sideClick', () => console.log('Side button clicked'));
      r1.hardware.on('scrollUp', () => console.log('Scrolled up'));
      r1.hardware.on('scrollDown', () => console.log('Scrolled down'));
    } catch (error) {
      console.log('Hardware events not available:', error);
    }
  }
}

// Try R1 SDK initialization with timeout fallback
try {
  createR1App(async (sdk) => {
    console.log('R1 SDK initialized');
    isR1Device = true;
    await initializeApp();
  });
  
  // Fallback: If R1 SDK doesn't initialize in 2 seconds, run in browser mode
  setTimeout(() => {
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) {
      console.log('R1 SDK timeout - initializing in browser mode');
      initializeApp();
    }
  }, 2000);
} catch (error) {
  console.error('R1 SDK error - initializing in browser mode:', error);
  initializeApp();
}
