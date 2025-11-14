const { r1App, r1Screen, r1Button, r1Select, r1Input, r1Text, r1Camera } = require('r1-create');

// Fantasy D&D Theme Styles
const THEME = {
  colors: {
    primary: '#8B4513',        // Saddle brown (leather)
    secondary: '#DAA520',      // Goldenrod (gold accents)
    background: '#2C1810',     // Dark brown (parchment aged)
    surface: '#3E2723',        // Darker brown (wood)
    text: '#F5DEB3',           // Wheat (aged parchment text)
    textDark: '#8B7355',       // Burlywood dark
    accent: '#CD853F',         // Peru (bronze/copper)
    danger: '#8B0000',         // Dark red
    success: '#228B22',        // Forest green
    border: '#DAA520',         // Gold border
  },
  fonts: {
    title: { fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 'bold' },
    heading: { fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 'bold' },
    body: { fontFamily: 'Georgia, serif', fontSize: 16 },
    label: { fontFamily: 'Georgia, serif', fontSize: 14, fontWeight: '600' },
  },
  spacing: {
    small: 8,
    medium: 15,
    large: 20,
    xlarge: 30,
  },
  borderRadius: 8,
  borderWidth: 2,
};

// Reusable style objects
const styles = {
  screen: {
    backgroundColor: THEME.colors.background,
    padding: THEME.spacing.large,
  },
  title: {
    ...THEME.fonts.title,
    color: THEME.colors.secondary,
    textAlign: 'center',
    marginBottom: THEME.spacing.large,
    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
    letterSpacing: '2px',
  },
  heading: {
    ...THEME.fonts.heading,
    color: THEME.colors.secondary,
    marginBottom: THEME.spacing.medium,
    textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
  },
  text: {
    ...THEME.fonts.body,
    color: THEME.colors.text,
    marginBottom: THEME.spacing.medium,
  },
  select: {
    backgroundColor: THEME.colors.surface,
    color: THEME.colors.text,
    borderColor: THEME.colors.border,
    borderWidth: THEME.borderWidth,
    borderRadius: THEME.borderRadius,
    padding: THEME.spacing.medium,
    marginBottom: THEME.spacing.medium,
    fontFamily: 'Georgia, serif',
    fontSize: 16,
  },
  input: {
    backgroundColor: THEME.colors.surface,
    color: THEME.colors.text,
    borderColor: THEME.colors.border,
    borderWidth: THEME.borderWidth,
    borderRadius: THEME.borderRadius,
    padding: THEME.spacing.medium,
    marginBottom: THEME.spacing.medium,
    fontFamily: 'Georgia, serif',
    fontSize: 16,
  },
  buttonPrimary: {
    backgroundColor: THEME.colors.primary,
    color: THEME.colors.secondary,
    borderColor: THEME.colors.border,
    borderWidth: THEME.borderWidth,
    borderRadius: THEME.borderRadius,
    padding: THEME.spacing.medium,
    marginTop: THEME.spacing.medium,
    fontFamily: 'Georgia, serif',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.5)',
  },
  buttonSuccess: {
    backgroundColor: THEME.colors.success,
    color: THEME.colors.text,
    borderColor: THEME.colors.border,
    borderWidth: THEME.borderWidth,
    borderRadius: THEME.borderRadius,
    padding: THEME.spacing.medium,
    marginTop: THEME.spacing.small,
    fontFamily: 'Georgia, serif',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.5)',
  },
  buttonSecondary: {
    backgroundColor: THEME.colors.accent,
    color: THEME.colors.text,
    borderColor: THEME.colors.border,
    borderWidth: THEME.borderWidth,
    borderRadius: THEME.borderRadius,
    padding: THEME.spacing.medium,
    marginTop: THEME.spacing.small,
    fontFamily: 'Georgia, serif',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.5)',
  },
  buttonDanger: {
    backgroundColor: THEME.colors.danger,
    color: THEME.colors.text,
    borderColor: THEME.colors.border,
    borderWidth: THEME.borderWidth,
    borderRadius: THEME.borderRadius,
    padding: THEME.spacing.medium,
    marginTop: THEME.spacing.small,
    fontFamily: 'Georgia, serif',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.5)',
  },
  buttonNeutral: {
    backgroundColor: THEME.colors.surface,
    color: THEME.colors.text,
    borderColor: THEME.colors.textDark,
    borderWidth: THEME.borderWidth,
    borderRadius: THEME.borderRadius,
    padding: THEME.spacing.medium,
    marginTop: THEME.spacing.medium,
    fontFamily: 'Georgia, serif',
    fontSize: 16,
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  label: {
    ...THEME.fonts.label,
    color: THEME.colors.secondary,
    marginBottom: THEME.spacing.small,
  },
  divider: {
    height: 2,
    backgroundColor: THEME.colors.border,
    marginTop: THEME.spacing.large,
    marginBottom: THEME.spacing.large,
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
  CUSTOM_VALUES: 'dnd_custom_values'
};

// App state
let characterFields = { ...DEFAULT_FIELDS };
let selectedValues = {};
let customFields = {};
let customValues = {};

// Load custom fields and values from storage
function loadCustomData() {
  try {
    const storedFields = localStorage.getItem(STORAGE_KEYS.CUSTOM_FIELDS);
    const storedValues = localStorage.getItem(STORAGE_KEYS.CUSTOM_VALUES);
    
    if (storedFields) {
      customFields = JSON.parse(storedFields);
      // Merge custom fields with defaults
      characterFields = { ...DEFAULT_FIELDS, ...customFields };
    }
    
    if (storedValues) {
      customValues = JSON.parse(storedValues);
      // Merge custom values into existing fields
      Object.keys(customValues).forEach(fieldKey => {
        if (characterFields[fieldKey]) {
          characterFields[fieldKey].values = [
            ...characterFields[fieldKey].values,
            ...customValues[fieldKey]
          ];
        }
      });
    }
  } catch (error) {
    console.error('Error loading custom data:', error);
  }
}

// Save custom fields and values to storage
function saveCustomData() {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_FIELDS, JSON.stringify(customFields));
    localStorage.setItem(STORAGE_KEYS.CUSTOM_VALUES, JSON.stringify(customValues));
  } catch (error) {
    console.error('Error saving custom data:', error);
  }
}

// Add a custom field
function addCustomField(fieldKey, fieldName) {
  if (!characterFields[fieldKey]) {
    customFields[fieldKey] = {
      name: fieldName,
      values: [],
      isDefault: false
    };
    characterFields[fieldKey] = customFields[fieldKey];
    saveCustomData();
    return true;
  }
  return false;
}

// Add a custom value to a field
function addCustomValue(fieldKey, value) {
  if (characterFields[fieldKey]) {
    if (!characterFields[fieldKey].values.includes(value)) {
      if (!customValues[fieldKey]) {
        customValues[fieldKey] = [];
      }
      customValues[fieldKey].push(value);
      characterFields[fieldKey].values.push(value);
      saveCustomData();
      return true;
    }
  }
  return false;
}

// Delete a custom field
function deleteCustomField(fieldKey) {
  if (customFields[fieldKey]) {
    delete customFields[fieldKey];
    delete characterFields[fieldKey];
    delete customValues[fieldKey];
    delete selectedValues[fieldKey];
    saveCustomData();
    return true;
  }
  return false;
}

// Delete a custom value from a field
function deleteCustomValue(fieldKey, value) {
  if (customValues[fieldKey]) {
    const index = customValues[fieldKey].indexOf(value);
    if (index > -1) {
      customValues[fieldKey].splice(index, 1);
      const fieldIndex = characterFields[fieldKey].values.indexOf(value);
      if (fieldIndex > -1) {
        characterFields[fieldKey].values.splice(fieldIndex, 1);
      }
      if (selectedValues[fieldKey] === value) {
        selectedValues[fieldKey] = null;
      }
      saveCustomData();
      return true;
    }
  }
  return false;
}

// Generate the D&D character prompt
function generateCharacterPrompt() {
  const characterParts = [];
  
  // Build race, class, gender description
  if (selectedValues.gender) characterParts.push(`a ${selectedValues.gender.toLowerCase()}`);
  if (selectedValues.race) characterParts.push(selectedValues.race.toLowerCase());
  if (selectedValues.class) characterParts.push(selectedValues.class.toLowerCase());
  
  // Add body type and emotion descriptors
  const descriptors = [];
  if (selectedValues.bodyType) descriptors.push(selectedValues.bodyType.toLowerCase());
  if (selectedValues.emotion) descriptors.push(`with a ${selectedValues.emotion.toLowerCase()} expression`);
  
  // Combine main character description
  let characterDescription = characterParts.join(' ');
  
  // Add descriptors if any
  if (descriptors.length > 0) {
    characterDescription += ` who is ${descriptors.join(' and ')}`;
  }
  
  // Add equipment
  if (selectedValues.equipment && selectedValues.equipment !== 'Unequipped') {
    characterDescription += `, wielding ${selectedValues.equipment.toLowerCase()}`;
  }
  
  // Add custom field values (excluding artStyle)
  Object.keys(selectedValues).forEach(key => {
    if (!DEFAULT_FIELDS[key] && selectedValues[key]) {
      characterDescription += `, ${characterFields[key].name.toLowerCase()}: ${selectedValues[key].toLowerCase()}`;
    }
  });
  
  // Determine art style
  const artStyle = selectedValues.artStyle ? selectedValues.artStyle.toLowerCase() : 'fantasy';
  
  // Build the final prompt
  const prompt = `Take a picture and turn the subject into a Dungeons and Dragons character who is ${characterDescription} in a ${artStyle} art style`;
  
  return prompt;
}

// Main character creation screen
const CharacterCreationScreen = r1Screen({
  name: 'Character Creation',
  style: styles.screen,
  onLoad: () => {
    loadCustomData();
  },
  render: () => {
    return [
      r1Text({
        text: '⚔️ Create Your D&D Character ⚔️',
        style: styles.title
      }),
      
      r1Text({
        text: 'Choose your character\'s attributes from the ancient scrolls below...',
        style: { ...styles.text, fontStyle: 'italic', textAlign: 'center', marginBottom: THEME.spacing.large }
      }),
      
      // Render dropdowns for all fields
      ...Object.keys(characterFields).map(fieldKey => {
        const field = characterFields[fieldKey];
        return r1Select({
          label: field.name,
          options: field.values,
          value: selectedValues[fieldKey] || '',
          onChange: (value) => {
            selectedValues[fieldKey] = value;
          },
          style: styles.select,
          labelStyle: styles.label
        });
      }),
      
      // Action buttons
      r1Button({
        text: '🎨 Generate Character Image',
        onClick: () => {
          // Validate that at least some fields are selected
          if (Object.keys(selectedValues).length === 0) {
            alert('Please select at least one character attribute');
            return;
          }
          
          const prompt = generateCharacterPrompt();
          // Navigate to camera screen with the generated prompt
          r1App.navigate('CameraScreen', { prompt });
        },
        style: styles.buttonPrimary
      }),
      
      r1Button({
        text: '📜 Manage Custom Fields',
        onClick: () => {
          r1App.navigate('ManageFieldsScreen');
        },
        style: styles.buttonSecondary
      })
    ];
  }
});

// Camera screen for taking the character photo
const CameraScreen = r1Screen({
  name: 'Camera',
  style: styles.screen,
  render: ({ prompt }) => {
    return [
      r1Text({
        text: '📸 Capture Your Likeness',
        style: styles.heading
      }),
      
      r1Text({
        text: 'The magic mirror awaits to transform you into your character...',
        style: { ...styles.text, fontStyle: 'italic', marginBottom: THEME.spacing.medium }
      }),
      
      r1Text({
        text: `Enchantment: ${prompt}`,
        style: { ...styles.text, fontSize: 14, fontStyle: 'italic', color: THEME.colors.textDark, marginBottom: THEME.spacing.large }
      }),
      
      r1Camera({
        mode: 'freestyle',
        prompt: prompt,
        onCapture: (imageData) => {
          // The R1 will automatically upload to the user's journal
          // Show success message and return to main screen
          alert('⚡ Character image generated and saved to your journal!');
          r1App.navigate('CharacterCreationScreen');
        },
        onCancel: () => {
          r1App.navigate('CharacterCreationScreen');
        }
      })
    ];
  }
});

// Manage custom fields screen
const ManageFieldsScreen = r1Screen({
  name: 'Manage Fields',
  style: styles.screen,
  render: () => {
    return [
      r1Text({
        text: '📜 Customize Your Scrolls',
        style: styles.title
      }),
      
      r1Text({
        text: 'Modify the ancient texts to suit your needs',
        style: { ...styles.text, fontStyle: 'italic', textAlign: 'center', marginBottom: THEME.spacing.large }
      }),
      
      r1Button({
        text: '✨ Add Custom Field',
        onClick: () => {
          r1App.navigate('AddFieldScreen');
        },
        style: styles.buttonSuccess
      }),
      
      r1Button({
        text: '➕ Add Value to Existing Field',
        onClick: () => {
          r1App.navigate('AddValueScreen');
        },
        style: styles.buttonSecondary
      }),
      
      r1Button({
        text: '🗑️ Delete Custom Field',
        onClick: () => {
          r1App.navigate('DeleteFieldScreen');
        },
        style: styles.buttonDanger
      }),
      
      r1Button({
        text: '❌ Delete Custom Value',
        onClick: () => {
          r1App.navigate('DeleteValueScreen');
        },
        style: { ...styles.buttonDanger, backgroundColor: '#D2691E' }
      }),
      
      r1Button({
        text: '⬅️ Back to Character Creation',
        onClick: () => {
          r1App.navigate('CharacterCreationScreen');
        },
        style: styles.buttonNeutral
      })
    ];
  }
});

// Add custom field screen
const AddFieldScreen = r1Screen({
  name: 'Add Field',
  style: styles.screen,
  render: () => {
    let fieldKey = '';
    let fieldName = '';
    
    return [
      r1Text({
        text: '✨ Inscribe New Field',
        style: styles.heading
      }),
      
      r1Text({
        text: 'Add a new attribute to your character scrolls',
        style: { ...styles.text, fontStyle: 'italic', marginBottom: THEME.spacing.large }
      }),
      
      r1Input({
        label: 'Field Key (e.g., hairColor)',
        placeholder: 'Enter field key',
        onChange: (value) => { fieldKey = value; },
        style: styles.input,
        labelStyle: styles.label
      }),
      
      r1Input({
        label: 'Field Name (e.g., Hair Color)',
        placeholder: 'Enter field name',
        onChange: (value) => { fieldName = value; },
        style: styles.input,
        labelStyle: styles.label
      }),
      
      r1Button({
        text: '✓ Add Field',
        onClick: () => {
          if (!fieldKey || !fieldName) {
            alert('Please enter both field key and name');
            return;
          }
          
          if (addCustomField(fieldKey, fieldName)) {
            alert('✨ Field added successfully!');
            r1App.navigate('ManageFieldsScreen');
          } else {
            alert('⚠️ Field already exists');
          }
        },
        style: styles.buttonSuccess
      }),
      
      r1Button({
        text: 'Cancel',
        onClick: () => {
          r1App.navigate('ManageFieldsScreen');
        },
        style: styles.buttonNeutral
      })
    ];
  }
});

// Add value to field screen
const AddValueScreen = r1Screen({
  name: 'Add Value',
  style: styles.screen,
  render: () => {
    let selectedField = '';
    let newValue = '';
    
    return [
      r1Text({
        text: '➕ Add New Option',
        style: styles.heading
      }),
      
      r1Text({
        text: 'Expand the choices within an existing field',
        style: { ...styles.text, fontStyle: 'italic', marginBottom: THEME.spacing.large }
      }),
      
      r1Select({
        label: 'Select Field',
        options: Object.keys(characterFields).map(key => characterFields[key].name),
        onChange: (value) => {
          // Find the field key from the name
          selectedField = Object.keys(characterFields).find(
            key => characterFields[key].name === value
          );
        },
        style: styles.select,
        labelStyle: styles.label
      }),
      
      r1Input({
        label: 'New Value',
        placeholder: 'Enter new value',
        onChange: (value) => { newValue = value; },
        style: styles.input,
        labelStyle: styles.label
      }),
      
      r1Button({
        text: '✓ Add Value',
        onClick: () => {
          if (!selectedField || !newValue) {
            alert('Please select a field and enter a value');
            return;
          }
          
          if (addCustomValue(selectedField, newValue)) {
            alert('✨ Value added successfully!');
            r1App.navigate('ManageFieldsScreen');
          } else {
            alert('⚠️ Value already exists in this field');
          }
        },
        style: styles.buttonSuccess
      }),
      
      r1Button({
        text: 'Cancel',
        onClick: () => {
          r1App.navigate('ManageFieldsScreen');
        },
        style: styles.buttonNeutral
      })
    ];
  }
});

// Delete custom field screen
const DeleteFieldScreen = r1Screen({
  name: 'Delete Field',
  style: styles.screen,
  render: () => {
    let selectedField = '';
    const customFieldsList = Object.keys(customFields);
    
    if (customFieldsList.length === 0) {
      return [
        r1Text({
          text: '📜 No Custom Fields',
          style: styles.heading
        }),
        r1Text({
          text: 'You have not created any custom fields yet',
          style: { ...styles.text, textAlign: 'center', marginBottom: THEME.spacing.large }
        }),
        r1Button({
          text: '⬅️ Back',
          onClick: () => {
            r1App.navigate('ManageFieldsScreen');
          },
          style: styles.buttonNeutral
        })
      ];
    }
    
    return [
      r1Text({
        text: '🗑️ Remove Custom Field',
        style: styles.heading
      }),
      
      r1Text({
        text: 'Erase a custom field from your scrolls (default fields are protected)',
        style: { ...styles.text, fontStyle: 'italic', marginBottom: THEME.spacing.large }
      }),
      
      r1Select({
        label: 'Select Field to Delete',
        options: customFieldsList.map(key => customFields[key].name),
        onChange: (value) => {
          selectedField = Object.keys(customFields).find(
            key => customFields[key].name === value
          );
        },
        style: styles.select,
        labelStyle: styles.label
      }),
      
      r1Button({
        text: '🗑️ Delete Field',
        onClick: () => {
          if (!selectedField) {
            alert('Please select a field to delete');
            return;
          }
          
          if (confirm(`⚠️ Are you sure you want to delete ${customFields[selectedField].name}?`)) {
            deleteCustomField(selectedField);
            alert('✓ Field deleted successfully!');
            r1App.navigate('ManageFieldsScreen');
          }
        },
        style: styles.buttonDanger
      }),
      
      r1Button({
        text: 'Cancel',
        onClick: () => {
          r1App.navigate('ManageFieldsScreen');
        },
        style: styles.buttonNeutral
      })
    ];
  }
});

// Delete custom value screen
const DeleteValueScreen = r1Screen({
  name: 'Delete Value',
  style: styles.screen,
  render: () => {
    let selectedField = '';
    let selectedValue = '';
    const fieldsWithCustomValues = Object.keys(customValues).filter(
      key => customValues[key] && customValues[key].length > 0
    );
    
    if (fieldsWithCustomValues.length === 0) {
      return [
        r1Text({
          text: '📜 No Custom Values',
          style: styles.heading
        }),
        r1Text({
          text: 'You have not added any custom values yet',
          style: { ...styles.text, textAlign: 'center', marginBottom: THEME.spacing.large }
        }),
        r1Button({
          text: '⬅️ Back',
          onClick: () => {
            r1App.navigate('ManageFieldsScreen');
          },
          style: styles.buttonNeutral
        })
      ];
    }
    
    return [
      r1Text({
        text: '❌ Remove Custom Value',
        style: styles.heading
      }),
      
      r1Text({
        text: 'Erase a custom value from a field (default values are protected)',
        style: { ...styles.text, fontStyle: 'italic', marginBottom: THEME.spacing.large }
      }),
      
      r1Select({
        label: 'Select Field',
        options: fieldsWithCustomValues.map(key => characterFields[key].name),
        onChange: (value) => {
          selectedField = fieldsWithCustomValues.find(
            key => characterFields[key].name === value
          );
          selectedValue = ''; // Reset value selection
        },
        style: styles.select,
        labelStyle: styles.label
      }),
      
      selectedField && r1Select({
        label: 'Select Value to Delete',
        options: customValues[selectedField] || [],
        onChange: (value) => {
          selectedValue = value;
        },
        style: styles.select,
        labelStyle: styles.label
      }),
      
      r1Button({
        text: '❌ Delete Value',
        onClick: () => {
          if (!selectedField || !selectedValue) {
            alert('Please select a field and value to delete');
            return;
          }
          
          if (confirm(`⚠️ Are you sure you want to delete "${selectedValue}"?`)) {
            deleteCustomValue(selectedField, selectedValue);
            alert('✓ Value deleted successfully!');
            r1App.navigate('ManageFieldsScreen');
          }
        },
        style: styles.buttonDanger
      }),
      
      r1Button({
        text: 'Cancel',
        onClick: () => {
          r1App.navigate('ManageFieldsScreen');
        },
        style: styles.buttonNeutral
      })
    ];
  }
});

// Initialize the app
const app = r1App({
  name: 'D&D Character Generator',
  version: '1.0.0',
  screens: [
    CharacterCreationScreen,
    CameraScreen,
    ManageFieldsScreen,
    AddFieldScreen,
    AddValueScreen,
    DeleteFieldScreen,
    DeleteValueScreen
  ],
  initialScreen: 'CharacterCreationScreen'
});

module.exports = app;
