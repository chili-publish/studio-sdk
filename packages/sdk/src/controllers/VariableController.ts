import { EditorAPI, Id, PrivateData } from '../types/CommonTypes';
import { ConnectorRegistration } from '../types/ConnectorTypes';
import {
    DateRestriction,
    DateVariablePropertiesDeltaUpdate,
    Day,
    ListVariable,
    ListVariableItem,
    Locale,
    NumberVariablePropertiesDeltaUpdate,
    PrefixSuffixDeltaUpdate,
    Variable,
    VariableType,
    VariableVisibility,
    VariableVisibilityType,
} from '../types/VariableTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { ConnectorCompatibilityTools } from '../utils/ConnectorCompatibilityTools';

class NumberVariable {
    #editorAPI: EditorAPI;

    constructor(editorAPI: EditorAPI) {
        this.#editorAPI = editorAPI;
    }

    /**
     * @experimental Sets the minimum value for a number variable
     * @param id the id of the variable to update
     * @param minimum the minimum value or null to remove the minimum value
     * @returns
     */
    setMinimum = async (id: string, minimum: number | null) => {
        const update = { minValue: { value: minimum } };
        return this.applyPropertiesUpdate(id, update);
    };

    /**
     * @experimental Sets the maximum value for a number variable
     * @param id the id of the variable to update
     * @param maximum the maximum value or null to remove the maximum value
     * @returns
     */
    setMaximum = async (id: string, maximum: number | null) => {
        const update = { maxValue: { value: maximum } };
        return this.applyPropertiesUpdate(id, update);
    };

    /**
     * @experimental Sets the visibility of the stepper for a number variable
     * @param id the id of the variable to update
     * @param showStep true to show the stepper, false to hide it
     * @returns
     */
    setShowStepper = async (id: string, showStepper: boolean) => {
        const update = { showStepper: { value: showStepper } };
        return this.applyPropertiesUpdate(id, update);
    };

    /**
     * @experimental Sets the step size for a number variable
     * @param id the id of the variable to update
     * @param stepSize the step size. Must be > 0
     * @returns
     */
    setStepSize = async (id: string, stepSize: number) => {
        const update = { stepSize: { value: stepSize } };
        return this.applyPropertiesUpdate(id, update);
    };

    /**
     * @experimental Sets the thousands separator for a number variable
     * @param id the id of the variable to update
     * @param thousandsSeparator the thousands separator to use
     * @returns
     */
    setThousandsSeparator = async (id: string, thousandsSeparator: '' | '.' | ',' | ' ') => {
        const update = { thousandsSeparator: { value: thousandsSeparator } };
        return this.applyPropertiesUpdate(id, update);
    };

    /**
     * @experimental Sets the decimal separator for a number variable
     * @param id the id of the variable to update
     * @param decimalSeparator the decimal separator to use
     * @returns
     */
    setDecimalSeparator = async (id: string, decimalSeparator: '' | '.' | ',' | ' ') => {
        const update = { decimalSeparator: { value: decimalSeparator } };
        return this.applyPropertiesUpdate(id, update);
    };

    /**
     * @experimental Sets or clears the decimal character style for a number variable
     * @param id the id of the variable to update
     * @param characterStyleId the id of the character style to use/clear for the decimals
     * @returns
     */
    setDecimalCharacterStyle = async (id: string, characterStyleId: string | null) => {
        const update = { decimalCharacterStyleId: { value: characterStyleId } };
        return this.applyPropertiesUpdate(id, update);
    };

    /**
     * @experimental Sets the number of decimals for a number variable
     * @param id the id of the variable to update
     * @param numberOfDecimals the number of decimals to use
     * @returns
     */
    setNumberOfDecimals = async (id: string, numberOfDecimals: 0 | 1 | 2 | 3 | 4) => {
        const update = { numberOfDecimals: { value: numberOfDecimals } };
        return this.applyPropertiesUpdate(id, update);
    };

    private async applyPropertiesUpdate(id: string, update: NumberVariablePropertiesDeltaUpdate) {
        const res = await this.#editorAPI;
        const result = await res.updateNumberVariableProperties(id, JSON.stringify(update));
        return getEditorResponseData<null>(result);
    }
}

class DateVariable {
    #editorAPI: EditorAPI;

    constructor(editorAPI: EditorAPI) {
        this.#editorAPI = editorAPI;
    }

    /**
     * @experimental This method sets the display format for a date variable.
     *
     * The `displayFormat` is using ICU formatting (Unicode).
     *
     * Supported date formats:
     * - Day -> `d`, `dd`
     * - Month -> `M`, `MM`, `MMM`, `MMMM`
     * - Year -> `yy`, `yyyy`
     * - Day of week -> `ccc`, `cccc`
     *
     * Examples for an input date of `10-12-1815`:
     * - Format `dd/MM/yyyy` will display `12/10/1815`
     * - Format `d.M.yy` will display `12.10.15`
     * - Format `d MMM yyyy` will display `12 Oct 1815` for the `en_US` language
     * - Format `MMMM d, yyyy` will display `October 12, 1815` for the `en_US` language
     * - Format `ccc, MMM d, yyyy` will display `Thu, Oct 12, 1815` for the `en_US` language
     * - Format `cccc, MMMM d, yyyy` will display `Thursday, October 12, 1815` for the `en_US` language
     * - Format `cccc, MMMM d, yyyy` will display `donderdag, oktober 12, 1815` for the `nl` language
     *
     * Patterns which output words such as `MMM`, `MMMM`, `ccc` and `cccc` will
     * differ depending on chosen language (default is `en_US`).
     *
     * @param id The id of the date variable to update
     * @param displayFormat The display format for the date variable
     */
    setDisplayFormat = async (id: string, displayFormat: string) => {
        const update = { displayFormat: { value: displayFormat } };
        return this.applyPropertiesUpdate(id, update);
    };

    /**
     * @experimental This method sets the locale for a date variable.
     *
     * @param id The id of the date variable to update
     * @param locale The locale for the date variable (`'en_US'`, `'fi'`, `'fr'`...)
     */
    setLocale = async (id: string, locale: Locale) => {
        const update = { locale: { value: locale } };
        return this.applyPropertiesUpdate(id, update);
    };

    /**
     * @experimental This method sets or clears the start date for a date variable.
     * @param id The id of the date variable to update
     * @param date The start date for the date variable
     */
    setStartDate = async (id: string, date: DateRestriction | null) => {
        const update = { startDate: { value: date } };
        return this.applyPropertiesUpdate(id, update);
    };

    /**
     * @experimental This method sets or clears the end date for a date variable.
     * @param id The id of the date variable to update
     * @param date The end date for the date variable
     */
    setEndDate = async (id: string, date: DateRestriction | null) => {
        const update = { endDate: { value: date } };
        return this.applyPropertiesUpdate(id, update);
    };

    /**
     * @experimental This method sets or clears the excluded days for a date variable.
     * @param id The id of the date variable to update
     * @param excludedDays The excluded days for the date variable
     */
    setExcludedDays = async (id: string, excludedDays: Day[] | null) => {
        const update = { excludedDays: { value: excludedDays } };
        return this.applyPropertiesUpdate(id, update);
    };

    private async applyPropertiesUpdate(id: string, update: DateVariablePropertiesDeltaUpdate) {
        const res = await this.#editorAPI;
        const result = await res.updateDateVariableProperties(id, JSON.stringify(update));
        return getEditorResponseData<null>(result);
    }
}

/**
 * The VariableController is responsible for all communication regarding the variables.
 * Methods inside this controller can be called by `window.SDK.variable.{method-name}`
 */
export class VariableController {
    /**
     * @ignore
     */
    #editorAPI: EditorAPI;

    number: NumberVariable;
    date: DateVariable;

    /**
     * @ignore
     */
    constructor(editorAPI: EditorAPI) {
        this.#editorAPI = editorAPI;
        this.number = new NumberVariable(this.#editorAPI);
        this.date = new DateVariable(this.#editorAPI);
    }

    /**
     * This method returns the list of variables
     * @returns
     */
    getAll = async () => {
        const res = await this.#editorAPI;
        return res
            .getVariables()
            .then((result) => getEditorResponseData<Variable[]>(result))
            .then((resp) => {
                const update = resp;
                if (update.parsedData) {
                    update.parsedData = this.makeVariablesBackwardsCompatible(update.parsedData);
                }
                return update;
            });
    };

    /**
     * This method returns a variable by id
     * @param id the id of a specific variable
     * @returns
     */
    getById = async (id: string) => {
        const res = await this.#editorAPI;
        return res
            .getVariableById(id)
            .then((result) => getEditorResponseData<Variable>(result))
            .then((resp) => {
                const update = resp;
                if (update.parsedData) {
                    update.parsedData = this.makeVariableBackwardsCompatible(update.parsedData);
                }
                return update;
            });
    };

    /**
     * This method returns a variable by name
     * @param name the name of a specific variable
     * @returns
     */
    getByName = async (name: string) => {
        const res = await this.#editorAPI;
        return res
            .getVariableByName(name)
            .then((result) => getEditorResponseData<Variable>(result))
            .then((resp) => {
                const update = resp;
                if (update.parsedData) {
                    update.parsedData = this.makeVariableBackwardsCompatible(update.parsedData);
                }
                return update;
            });
    };

    /**
     * This method creates a new variable
     * @param parentId parent id of the created variable
     * @param type type of the created variable
     * @returns the new created variable id
     */
    create = async (parentId: string, type: VariableType) => {
        const res = await this.#editorAPI;
        return res.addVariable(parentId, type).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method removes a list of variables.
     *
     * All connectors linked to the variables will be unregistered.
     * @param ids list of the variables to be removed
     * @returns
     */
    remove = async (ids: string[]) => {
        const res = await this.#editorAPI;
        return res.removeVariables(ids).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets a new name for a variable
     * @param id id of the variable
     * @param name name of the variable
     * @returns
     */
    rename = async (id: string, name: string) => {
        const res = await this.#editorAPI;
        return res.setVariableName(id, name).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets a new label for a variable
     * @param id id of the variable
     * @param label label of the variable
     * @returns
     */
    setLabel = async (id: string, label: string | null) => {
        const res = await this.#editorAPI;
        return res.setVariableLabel(id, label).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Internal private method to set/reset a placeholder for a variable
     */
    #setPlaceholder = async (id: string, placeholder: string | null) => {
        const res = await this.#editorAPI;
        return res.setVariablePlaceholder(id, placeholder).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets a new placeholder for a variable
     * @param id id of the variable
     * @param placeholder placeholder of the variable
     * @returns
     */
    setPlaceholder = async (id: string, placeholder: string) => {
        return this.#setPlaceholder(id, placeholder);
    };

    /**
     * This method resets a placeholder for a variable
     * @param id id of the variable
     * @returns
     */
    resetPlaceholder = async (id: string) => {
        return this.#setPlaceholder(id, null);
    };

    /**
     * Internal private method to set/reset a help text for a variable
     */
    #setHelpText = async (id: string, helpText: string | null) => {
        const res = await this.#editorAPI;
        return res.setVariableHelpText(id, helpText).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets a new help text for a variable
     * @param id id of the variable
     * @param helpText placeholder of the variable
     * @returns
     */
    setHelpText = async (id: string, helpText: string) => {
        return this.#setHelpText(id, helpText);
    };

    /**
     * This method resets a help text for a variable
     * @param id id of the variable
     * @returns
     */
    resetHelpText = async (id: string) => {
        return this.#setHelpText(id, null);
    };

    /**
     * This method sets a new type for a variable
     * @param id id of the variable
     * @param type type of the variable
     * @returns
     */
    setType = async (id: string, type: VariableType) => {
        const res = await this.#editorAPI;
        return res.setVariableType(id, type).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets the items of the list variable
     *
     * The items need to be unique and are not case sensitive.
     *
     * @param id the id of the list variable
     * @param items the items of the list
     * @returns
     */
    setListVariable = async (id: Id, items: string[]) => {
        const res = await this.#editorAPI;
        return res
            .setListVariableItems(
                id,
                items.map((item) => JSON.stringify(<ListVariableItem>{ value: item })),
            )
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets a new value for a variable
     *
     * If the value is some text to be set on a ShortTextVariable, it must not
     * contain any type of line breaks.
     *
     * @param id the id of the variable
     * @param value the new value of the variable
     * @returns
     */
    setValue = async (id: Id, value: string | boolean | number | null) => {
        const res = await this.#editorAPI;
        return res.setVariableValue(id, value).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method creates a copy of a variable
     * @returns
     */
    duplicate = async (id: string) => {
        const res = await this.#editorAPI;
        return res.duplicateVariable(id).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method aggregates the provided variables into a new group
     * @param name name of the new group
     * @param ids list of variable ids to group together
     * @returns group id
     */
    groupVariables = async (name: string, ids: string[]) => {
        const res = await this.#editorAPI;
        return res.groupVariables(name, ids).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method dissolves the specified group
     * @param id id of the variable group
     * @returns
     */
    ungroupVariables = async (id: string) => {
        const res = await this.#editorAPI;
        return res.ungroupVariable(id).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method moves a variable's position
     * @param order new order of variable
     * @param id id of the variable
     * @param parentId parent id of the created variable
     * @returns
     */
    move = async (order: number, id: string, parentId: string) => {
        const res = await this.#editorAPI;
        return res.moveVariable(id, parentId, order).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method changes positions of variables
     * @param order new order of variable
     * @param ids Array of the variable IDs
     * @param parentId parent id of the variables
     * @returns
     */
    moveVariables = async (order: number, ids: string[], parentId: string) => {
        const res = await this.#editorAPI;
        return res.moveVariables(ids, parentId, order).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @deprecated Use `setVariableVisibility` instead.
     * This method redirects to `setVariableVisibility` and sets visibility config for a variable by id.
     * @param id variable id
     * @param isVisible visibility flag
     * @returns
     */
    setIsVisible = async (id: string, isVisible: boolean) => {
        const config = isVisible
            ? { type: VariableVisibilityType.visible }
            : { type: VariableVisibilityType.invisible };

        return this.setVariableVisibility(id, config as VariableVisibility);
    };

    /**
     * @deprecated Use `setVariableVisibility` instead.
     * This method redirects to `setVariableVisibility` and sets visibility config for a variable by id.
     * @param id variable id
     * @param isHidden visibility flag
     * @returns
     */
    setIsHidden = async (id: string, isHidden: boolean) => {
        const config = isHidden ? { type: VariableVisibilityType.invisible } : { type: VariableVisibilityType.visible };

        return this.setVariableVisibility(id, config as VariableVisibility);
    };

    /**
     * This method sets visibility config for a variable by id
     * @param id variable id
     * @param config visibility config
     * @returns
     */
    setVariableVisibility = async (id: string, config: VariableVisibility) => {
        const res = await this.#editorAPI;
        return res
            .setVariableVisibility(id, JSON.stringify(config))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets which layouts are considered for variable visibility
     * @param layoutIdList nullable layout id list.
     * Pass null to reset to follow selected layout.
     * @returns
     */
    setLayoutsForVariableVisibility = async (layoutIdList?: Id[] | null) => {
        const res = await this.#editorAPI;
        return res
            .setLayoutsForVariableVisibility(layoutIdList ? JSON.stringify(layoutIdList) : null)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets isRequired flag for a variable
     * @returns
     */
    setIsRequired = async (id: string, isRequired: boolean) => {
        const res = await this.#editorAPI;
        return res.setVariableIsRequired(id, isRequired).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets removeParagraphIfEmpty flag for a variable
     * @param id The id of the variable to update
     * @param removeParagraphIfEmpty Set to true to remove the paragraph if it is empty, or false to keep it
     * @returns
     */
    setRemoveParagraphIfEmpty = async (id: string, removeParagraphIfEmpty: boolean) => {
        const res = await this.#editorAPI;
        return res
            .setVariableRemoveParagraphIfEmpty(id, removeParagraphIfEmpty)
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets isReadonly flag for a variable
     * @returns
     */
    setIsReadonly = async (id: string, isReadonly: boolean) => {
        const res = await this.#editorAPI;
        return res.setVariableIsReadonly(id, isReadonly).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method gets the image variable connector id.
     * @param id The id of the image variable
     * @returns The id of the connector
     */
    getImageVariableConnectorId = async (id: string) => {
        const res = await this.#editorAPI;
        return res.getImageVariableConnectorId(id).then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * This method sets the image variable connector. Setting a connector will
     * automatically remove the assetId linked to the connector if present.
     * If a connector was the source of the variable, it will be unregistered.
     * @param id The id of the image variable to update
     * @param registration registration object containing all details about the connector
     * @returns The new id of the connector
     */
    setImageVariableConnector = async (id: string, registration: ConnectorRegistration) => {
        const res = await this.#editorAPI;
        const connectorCompatibilityTools = new ConnectorCompatibilityTools();
        const connectorRegistration = connectorCompatibilityTools.makeConnectorSourceForwardsCompatible(registration);

        return res
            .setImageVariableConnector(id, JSON.stringify(connectorRegistration))
            .then((result) => getEditorResponseData<Id>(result));
    };

    /**
     * @deprecated use `setValue` instead and pass `null` as the value argument.
     *
     * This method removes the variable source
     * @param id the id of the variable to update
     */
    removeSource = async (id: string) => {
        return this.setValue(id, null);
    };

    /**
     * @experimental Sets the prefix for a supported variable
     * @param id the id of the variable to update
     * @param prefix the prefix to set/clear
     * @returns
     */
    setPrefix = async (id: string, prefix: string | null) => {
        const update = { prefix: { value: prefix } };
        return this.applyPrefixSuffixDeltaUpdate(id, update);
    };

    /**
     * @experimental Sets the suffix for a supported variable
     * @param id the id of the variable to update
     * @param suffix the suffix to set/clear
     * @returns
     */
    setSuffix = async (id: string, suffix: string | null) => {
        const update = { suffix: { value: suffix } };
        return this.applyPrefixSuffixDeltaUpdate(id, update);
    };

    /**
     * @experimental Sets the prefix character style for a supported variable
     * @param id the id of the variable to update
     * @param characterStyleId the id of the character style to use/clear for the prefix
     * @returns
     */
    setPrefixCharacterStyle = async (id: string, characterStyleId: string | null) => {
        const update = { prefixCharacterStyleId: { value: characterStyleId } };
        return this.applyPrefixSuffixDeltaUpdate(id, update);
    };

    /**
     * @experimental Sets the suffix character style for a supported variable
     * @param id the id of the variable to update
     * @param characterStyleId the id of the character style to use/clear for the suffix
     * @returns
     */
    setSuffixCharacterStyle = async (id: string, characterStyleId: string | null) => {
        const update = { suffixCharacterStyleId: { value: characterStyleId } };
        return this.applyPrefixSuffixDeltaUpdate(id, update);
    };

    /**
     * Sets the private data for any variable
     * @param id the id of the variable to update
     * @param privateData the private data
     * @returns
     */
    setPrivateData = async (id: string, privateData: PrivateData) => {
        const res = await this.#editorAPI;
        return res
            .setVariablePrivateData(id, JSON.stringify(privateData))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Gets the private data for any variable
     * @param id the id of the variable
     * @returns the private data
     */
    getPrivateData = async (id: string) => {
        const res = await this.#editorAPI;
        return res.getVariablePrivateData(id).then((result) => getEditorResponseData<PrivateData>(result));
    };

    /**
     * This method sets the allowQuery flag for an image variable
     * @param id the id of the variable
     * @param allowQuery the allowQuery flag
     * @returns
     */
    setAllowImageQuery = async (id: string, allowQuery: boolean) => {
        const res = await this.#editorAPI;
        return res.setImageVariableAllowQuery(id, allowQuery).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets the allowUpload flag for an image variable
     * @param id the id of the variable
     * @param allowUpload the allowUpload flag
     * @returns
     */
    setAllowImageUpload = async (id: string, allowUpload: boolean) => {
        const res = await this.#editorAPI;
        return res.setImageVariableAllowUpload(id, allowUpload).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets the minimum size (both width and height) for an image variable that will be uploaded
     * @param id the id of the variable
     * @param minWidth the minimum width
     * @param minHeight the minimum height
     * @returns
     */
    setMinImageUploadSize = async (id: string, minWidth: string | null, minHeight: string | null) => {
        const res = await this.#editorAPI;
        return res
            .setImageVariableUploadMinSize(id, minWidth, minHeight)
            .then((result) => getEditorResponseData<null>(result));
    };

    private makeVariablesBackwardsCompatible(variables: Variable[]) {
        return variables.map((variable) => {
            return this.makeVariableBackwardsCompatible(variable);
        });
    }

    private makeVariableBackwardsCompatible(variable: Variable) {
        if (variable.type !== VariableType.list) {
            return variable;
        }

        return this.makeListVariableBackwardsCompatible(variable as ListVariable);
    }

    private makeListVariableBackwardsCompatible(listVariable: ListVariable) {
        const updated = listVariable;

        const items = listVariable.items as unknown as ListVariableItem[];
        const selected = listVariable.selected as unknown as ListVariableItem | undefined;

        const newItems = items.map((item) => item.value);

        updated.items = newItems;
        updated.selected = selected?.value;

        return updated;
    }

    private async applyPrefixSuffixDeltaUpdate(id: string, update: PrefixSuffixDeltaUpdate) {
        const res = await this.#editorAPI;
        const result = await res.updateVariablePrefixSuffixProperties(id, JSON.stringify(update));
        return getEditorResponseData<null>(result);
    }
}
