/**
 * Check if commands are different
 * @param {object} existingCommand - Command object
 * @param {object} localCommand - Command object
 * @returns boolean
 */
module.exports = (existingCommand, localCommand) => {
    // Check if the choices are different
    const areChoicesDifferent = (existingChoices, localChoices) => {
        for (const localChoice of localChoices) {
            const existingChoice = existingChoices?.find(
                (choice) => choice.name === localChoice.name
            );

            if (!existingChoice) {
                return true;
            }

            if (localChoice.value !== existingChoice.value) {
                return true;
            }
        }
        return false;
    };

    // Check if the choices are different
    const areOptionsDifferent = (existingOptions, localOptions) => {
        for (const localOption of localOptions) {
            const existingOption = existingOptions?.find(
                (option) => option.name === localOption.name
            );

            if (!existingOption) {
                return true;
            }

            if (
                localOption.description !== existingOption.description ||
                localOption.type !== existingOption.type ||
                (localOption.required || false) !== existingOption.required ||
                (localOption.choices?.length || 0) !==
                (existingOption.choices?.length || 0) ||
                areChoicesDifferent(
                    localOption.choices || [],
                    existingOption.choices || []
                )
            ) {
                return true;
            }
        }
        return false;
    };

    // Checks if the description is the same, or if the options have changed
    if (
        existingCommand.description !== localCommand.description ||
        existingCommand.options?.length !== (localCommand.options?.length || 0) ||
        areOptionsDifferent(existingCommand.options, localCommand.options || [])
    ) {
        return true;
    }

    return false;
};