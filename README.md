# D&D Character Pic Generator

A Rabbit R1 app that generates Dungeons & Dragons character images using the R1's magic camera with customizable character attributes.

## Features

- **Character Creation**: Select from predefined D&D attributes (Race, Class, Gender, Equipment, Body Type, Emotion)
- **Magic Camera Integration**: Uses R1's freestyle magic camera to generate character images
- **Custom Fields**: Add your own character attributes and values
- **Persistent Storage**: Custom fields and values are saved between sessions
- **Journal Integration**: Generated images are automatically saved to your R1 journal

## Getting Started

### Installation

1. Ensure you have Node.js installed
2. Clone this repository
3. Install dependencies:
   ```bash
   npm install
   ```

### Running on Rabbit R1

1. Build the app using the r1-create CLI
2. Deploy to your Rabbit R1 device following the official Rabbit R1 development guidelines

## Usage

### Creating a Character

1. Open the app on your R1
2. Select character attributes from the dropdown menus:
   - **Race**: Aasimar, Dragonborn, Dwarf, Elf, etc.
   - **Class**: Artificer, Barbarian, Bard, Cleric, etc.
   - **Gender**: Male, Female, Non-Binary
   - **Equipment**: Sword and Shield, Daggers, Wizard Staff, etc.
   - **Body Type**: Muscular, Normal, Scrawny
   - **Emotion**: Serious, Angry, Happy, Sad, etc.
   - **Art Style**: Fantasy, Anime, Gritty and Realistic, Caricature
3. Tap "Generate Character Image"
4. Take a photo using the R1's magic camera
5. The app generates a D&D character image and saves it to your journal

### Managing Custom Fields

You can customize the app by adding your own fields and values:

- **Add Custom Field**: Create entirely new character attributes (e.g., "Hair Color", "Background")
- **Add Value to Field**: Add new options to existing fields (e.g., add "Platinum Blonde" to Hair Color)
- **Delete Custom Field**: Remove custom fields you've created (default fields cannot be deleted)
- **Delete Custom Value**: Remove custom values you've added (default values cannot be deleted)

All custom data is saved locally and persists between app sessions.

## Default Character Attributes

The app comes with these predefined fields:

- **Race**: 12 options (Aasimar, Dragonborn, Dwarf, Elf, Gnome, Goliath, Halfling, Half-Elf, Half-Orc, Human, Orc, Tiefling)
- **Class**: 13 options (Artificer, Barbarian, Bard, Cleric, Druid, Fighter, Monk, Paladin, Ranger, Rogue, Sorcerer, Warlock, Wizard)
- **Gender**: 3 options (Male, Female, Non-Binary)
- **Equipment**: 6 options (Sword and Shield, Daggers, Single Axe, Two Axes, Wizard Staff, Unequipped)
- **Body Type**: 3 options (Muscular, Normal, Scrawny)
- **Emotion**: 6 options (Serious, Angry, Happy, Sad, Sad and Sobbing, Insane)
- **Art Style**: 4 options (Fantasy, Anime, Gritty and Realistic, Caricature)

## Customizing the Prompt

The character prompt is generated in the `generateCharacterPrompt()` function in `app.js`. You can modify this function to adjust how the AI interprets your character attributes.

## Technical Details

- Built with `r1-create` framework
- Uses localStorage for persistent custom data storage
- Integrates with R1's magic camera freestyle mode
- Automatically uploads generated images to the user's journal

## License

ISC
