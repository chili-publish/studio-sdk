declare module 'grafx-studio-actions' {
    global {
        /**
         * Studio root object is globally available inside actions
         */
        const studio: ActionApi;

        /**
         * The trigger that caused this action to execute.
         */
        const triggers: Triggers;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const console: Console;

        /**
         * An interface representing the trigger for executing this action.
         */
        export interface Triggers {
            /**
             * If the event was `variableValueChanged`, this will contain the
             * variable that caused the trigger to fire.
             */
            readonly variableValueChanged?: Variable;

            /**
             * If the event was `selectedLayoutChanged`, this will contain the
             * layout that caused the trigger to fire.
             */
            readonly selectedLayoutChanged?: Layout;

            /**
             * If the event was `frameMoved`, this will contain the
             * frame that caused the trigger to fire.
             */
            readonly frameMoved?: Frame;

            /**
             * If the event was `pageSizeChanged`, this will contain the
             * page that caused the trigger to fire.
             */
            readonly pageSizeChanged?: Page;

            /**
             * If the event was `documentLoaded`, this will return true.
             * otherwise it will return false.
             */
            readonly documentLoaded: boolean;
        }

        export interface Console {
            log(...data: unknown[]): void;
        }

        /**
         * An interface representing the API for working with actions.
         * Provides access to objects for manipulating frames, variables,
         * layouts, page and stylekit properties.
         */
        export interface ActionApi {
            /** An object for manipulating frames */
            frames: FramesController;
            /** An object for manipulating variables */
            variables: VariablesController;
            /** An object for manipulating layouts */
            layouts: LayoutsController;
            /** An object for manipulating the pages */
            pages: PageController;
            /** An object for manipulating stylekit items */
            stylekit: Stylekit;
        }

        /**
         * All Studio objects that have a name will implement this interface.
         */
        export interface HasName {
            readonly name: string;
        }

        /**
         * Represents a Frame inside Actions
         */
        export interface Frame extends HasName {
            /**
             * the frame x position
             */
            readonly x: number;

            /**
             * The frame y position
             */
            readonly y: number;

            /**
             * The frame width
             */
            readonly width: number;

            /**
             * The frame height
             */
            readonly height: number;

            /**
             * The frame rotation (in degrees)
             */
            readonly rotation: number;

            /**
             * Whether the frame is visible
             */
            readonly isVisible: boolean;

            /**
             * The type of the frame (text, shape, image)
             */
            readonly type: FrameType;
        }

        export interface FrameMethods {
            /**
             * Moves a frame to a specified position
             * @param x the frame x position
             * @param y the frame y position
             * @returns
             */
            move(x: number | VariableValue, y: number | VariableValue): void;

            /**
             * Resizes a frame to a specified size
             * @param width the frame width
             * @param height the frame height
             * @returns
             */
            resize(width: number | VariableValue, height: number | VariableValue): void;

            /**
             * Moves a frame to a specified X position
             * @param x the frame x position
             * @returns
             */
            setX(x: number | VariableValue): void;

            /**
             * Moves a frame to a specified Y position
             * @param y the frame y position
             * @returns
             */
            setY(y: number | VariableValue): void;

            /**
             * Resizes a frame to a specified width
             * @param width the frame width
             * @returns
             */
            setWidth(width: number | VariableValue): void;

            /**
             * Resizes a frame to a specified height
             * @param height the frame height
             * @returns
             */
            setHeight(height: number | VariableValue): void;

            /**
             * Rotates a frame to a specified degree
             * @param rotation the frame rotation in degrees
             * @returns
             */
            setRotation(rotation: number | VariableValue): void;

            /**
             * Toggles the frame visibility
             * @param isVisible whether the frame is visible or not
             * @returns
             */
            setVisible(isVisible: boolean | VariableValue): void;
        }

        /**
         * Represents a Frame inside Actions
         * Contains frame methods that can be executed on this instance.
         */
        export type FrameWithMethods = Frame & FrameMethods;

        /**
         * Represents a Page inside Actions.
         */
        export interface Page {
            readonly width: number;
            readonly height: number;
        }

        export interface PageMethods {
            /**
             * Sets the size of the page
             * @param width the page width
             * @param height the page height
             * @returns
             */
            setSize(width: number | VariableValue, height: number | VariableValue): void;
        }

        /**
         * Represents a Page inside Actions.
         * Also contains the page specific methods.
         */
        export type PageWithMethods = Page & PageMethods;

        /**
         * Represents a Layout inside Actions
         */
        export interface Layout extends HasName {
            readonly width: number;
            readonly height: number;
        }

        export interface LayoutMethods {
            /**
             * Selects this layout
             * @returns
             */
            select(): void;
        }

        /**
         * Represents a Layout inside Actions
         * Contains layout specific methods
         */
        export type LayoutWithMethods = Layout & LayoutMethods;

        /**
         * Represents a Variable inside Actions
         */
        export type Variable =
            | ShortTextVariable
            | LongTextVariable
            | FormattedTextVariable
            | ImageVariable
            | ListVariable
            | BooleanVariable
            | NumberVariable
            | DateVariable
            | GroupVariable;

        export interface VariableMethods {
            /**
             * Sets the value of a variable
             * @param value the value
             * @returns
             */
            setValue(value: VariableValue): void;

            /**
             * Set the readonly state of a variable
             * @param value whether the variable is readonly
             * @returns
             */
            setReadonly(value: boolean | VariableValue): void;

            /**
             * Set the required state of a variable
             * @param value whether the variable is required
             * @returns
             */
            setRequired(value: boolean | VariableValue): void;

            /**
             * Set the visible state of a variable
             * @param isVisible whether the variable is visible
             * @returns
             */
            setVisible(isVisible: boolean | VariableValue): void;
        }

        /**
         * Represents a Variable inside Actions.
         * Has variable instance specific methods.
         */
        export type VariableWithMethods = Variable & VariableMethods;

        export enum VariableType {
            shortText = 'shortText',
            longText = 'longText',
            formattedText = 'formattedText',
            image = 'image',
            list = 'list',
            boolean = 'boolean',
            number = 'number',
            date = 'date',
            group = 'group',
        }

        export enum FrameType {
            text = 'text',
            shape = 'shape',
            image = 'image',
            barcode = 'barcode',
        }

        /**
         * The number thousands or decimal separator symbol.
         *
         * Possible values are:
         * - None = ''
         * - Space = ' '
         * - Dot = '.'
         * - Comma = ','
         */
        export type NumberSeparator = '' | '.' | ',' | ' ';

        /**
         * The language used to display the date.
         *
         * Possible values are:
         * - "en_US"
         * - "cs"
         * - "da"
         * - "nl"
         * - "fi"
         * - "fr"
         * - "de"
         * - "it"
         * - "no"
         * - "pl"
         * - "pt_PT"
         * - "es_ES"
         * - "sv"
         */
        export type Language =
            | 'en_US'
            | 'cs'
            | 'da'
            | 'nl'
            | 'fi'
            | 'fr'
            | 'de'
            | 'it'
            | 'no'
            | 'pl'
            | 'pt_PT'
            | 'es_ES'
            | 'sv';

        /**
         * The different values a Variable can have depending on the Variable Type.
         */
        export type VariableValue = string | boolean | number | Date | null;

        export interface BaseVariable extends HasName {
            /**
             * Whether the variable is visible
             */
            readonly isVisible: boolean;

            /**
             * Whether the variable is read-only
             */
            readonly isReadonly: boolean;

            /**
             * Whether the variable is required
             */
            readonly isRequired: boolean;

            /**
             * The type of the variable.
             */
            readonly type: VariableType;

            /**
             * The value of the current variable
             */
            readonly value: VariableValue;

            /**
             * The value of the current variable
             *
             * Make sure this variable is a StringVariable
             */
            readonly stringValue: string;

            /**
             * The value of the current variable
             *
             * Make sure this variable is a BooleanVariable
             */
            readonly booleanValue: boolean;

            /**
             * The value of the current variable
             *
             * Make sure this variable is a `NumberVariable`
             */
            readonly numberValue: number;

            /**
             * The value of the current variable
             *
             * Make sure this variable is a `DateVariable`
             */
            readonly dateValue: Date | null;
        }

        export interface ShortTextVariable extends BaseVariable {
            readonly type: VariableType.shortText;
        }

        export interface LongTextVariable extends BaseVariable {
            readonly type: VariableType.longText;
        }

        export interface FormattedTextVariable extends BaseVariable {
            readonly type: VariableType.formattedText;
        }

        export interface ImageVariable extends BaseVariable {
            readonly type: VariableType.image;
        }

        export interface ListVariable extends BaseVariable {
            readonly type: VariableType.list;
            readonly items: string[];
            readonly selected: string | null;
        }

        /**
         * Represents a boolean variable. This variable can store `boolean` values.
         */
        export interface BooleanVariable extends BaseVariable {
            readonly type: VariableType.boolean;

            /**
             * The current value of the variable.
             */
            readonly value: boolean;
        }

        /**
         * Represents a number variable. This variable can store `number` values.
         */
        export interface NumberVariable extends BaseVariable {
            readonly type: VariableType.number;

            /**
             * The current value of the variable.
             */
            readonly value: number;

            /**
             * Sets the decimal separator of the number variable.
             *
             * @param separator the decimal separator
             */
            setDecimalSeparator(separator: NumberSeparator): void;

            /**
             * Sets the thousands separator of the number variable.
             *
             * @param separator the thousands separator
             */
            setThousandsSeparator(separator: NumberSeparator): void;
        }

        /**
         * Represents a date variable. This variable can store `date` values.
         */
        export interface DateVariable extends BaseVariable {
            readonly type: VariableType.date;

            /**
             * The current value of the variable.
             */
            readonly value: Date | null;

            /**
             * Sets the display format of the date variable.
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
             * @param displayFormat the display format (`'yyyy-MM-dd'`)
             */
            setDisplayFormat(displayFormat: string): void;

            /**
             * Sets the language of the date variable.
             *
             * @param language the language (`'en_US'`, `'fi'`, `'fr'`...)
             */
            setLanguage(language: Language): void;
        }

        export interface GroupVariable extends BaseVariable {
            readonly type: VariableType.group;

            readonly value: never;
        }

        /**
         * Controller responsible for manipulating frames using Actions.
         */
        export interface FramesController {
            /**
             * Moves a frame to a specified position
             * @param name the frame name to move
             * @param x the frame x position
             * @param y the frame y position
             * @returns
             */
            move(name: string | Frame, x: number | VariableValue, y: number | VariableValue): void;

            /**
             * Resizes a frame to a specified size
             * @param name the frame name to resize
             * @param width the frame width
             * @param height the frame height
             * @returns
             */
            resize(name: string | Frame, width: number | VariableValue, height: number | VariableValue): void;

            /**
             * Moves a frame to a specified X position
             * @param name the frame name to move
             * @param x the frame x position
             * @returns
             */
            setX(name: string | Frame, x: number | VariableValue): void;

            /**
             * Moves a frame to a specified Y position
             * @param name the frame name to move
             * @param y the frame y position
             * @returns
             */
            setY(name: string | Frame, y: number | VariableValue): void;

            /**
             * Resizes a frame to a specified width
             * @param name the frame name to resize
             * @param width the frame width
             * @returns
             */
            setWidth(name: string | Frame, width: number | VariableValue): void;

            /**
             * Resizes a frame to a specified height
             * @param name the frame name to resize
             * @param height the frame height
             * @returns
             */
            setHeight(name: string | Frame, height: number | VariableValue): void;

            /**
             * Rotates a frame to a specified degree
             * @param name the frame name to rotate
             * @param rotation the frame rotation in degrees
             * @returns
             */
            setRotation(name: string | Frame, rotation: number | VariableValue): void;

            /**
             * Toggles the frame visibility
             * @param name the frame name to show/hide
             * @param isVisible whether the frame is visible or not
             * @returns
             */
            setVisible(name: string | Frame, isVisible: boolean | VariableValue): void;

            /**
             * Returns a list of all Frames
             * @returns
             */
            all(): FrameWithMethods[];

            /**
             * Returns a specific frame by name
             * @param name the frame name
             * @returns
             */
            byName(name: string | Frame): FrameWithMethods;
        }

        /**
         * Controller responsible for manipulating variables using Actions.
         */
        export interface VariablesController {
            /**
             * Gets a variable by name
             * @param name the variable name
             * @returns
             */
            byName(name: string | Variable): VariableWithMethods;

            /**
             * Returns a list of all variables
             * @returns
             */
            all(): VariableWithMethods[];

            /**
             * Sets the value of a variable
             * @param name the variable name
             * @param value the value
             * @returns
             */
            setValue(name: string | Variable, value: VariableValue): void;

            /**
             * Gets the value of a variable
             */
            getValue(name: string | Variable): VariableValue;

            /**
             * Gets the string value of a variable
             */
            getStringValue(name: string | Variable): string;

            /**
             * Gets the boolean value of a variable
             */
            getBooleanValue(name: string | Variable): boolean;

            /**
             * Gets the number value of a variable
             */
            getNumberValue(name: string | Variable): number;

            /**
             * Gets the date value of a variable
             */
            getDateValue(name: string | Variable): Date | null;

            /**
             * Set the readonly state of a variable
             * @param name the variable name
             * @param value whether the variable is readonly
             * @returns
             */
            setReadonly(name: string | Variable, value: boolean | VariableValue): void;

            /**
             * Set the required state of a variable
             * @param name the variable name
             * @param value whether the variable is required
             * @returns
             */
            setRequired(name: string | Variable, value: boolean | VariableValue): void;

            /**
             * Set the visible state of a variable
             * @param name the variable name
             * @param isVisible whether the variable is visible
             * @returns
             */
            setVisible(name: string | Variable, isVisible: boolean | VariableValue): void;
        }

        /**
         * Controller responsible for manipulating layouts using Actions.
         */
        export interface LayoutsController {
            /**
             * Returns the selected layout
             * @returns
             */
            getSelected(): Layout;

            /**
             * Selects a layout by name
             * @param layoutName the layout name to select
             * @returns
             */
            select(layoutName: string | Layout | VariableValue): void;

            /**
             * Returns all layouts in the document.
             */
            all(): LayoutWithMethods[];

            /**
             * Returns a specific layout by name
             * @param name the layout name
             * @returns
             */
            byName(name: string | Layout | VariableValue): LayoutWithMethods;
        }

        /**
         * Controller responsible for manipulating pages using Actions.
         */
        export interface PageController {
            /**
             * Gets the size of the page
             * @returns the page size
             */
            getSize(): PageWithMethods;

            /**
             * Sets the size of the page
             * @param width the page width
             * @param height the page height
             * @returns
             */
            setSize(width: number | VariableValue, height: number | VariableValue): void;
        }

        /**
         *  Grouping stylekit entities.
         */
        export interface Stylekit {
            /**
             * An object to manipulate stylekit colors.
             */
            readonly colors: StylekitColorsController;

            /**
             * An object to manipulate stylekit paragraph styles.
             */
            readonly paragraphStyles: StylekitParagraphStylesController;

            /**
             * An object to manipulate stylekit character styles.
             */
            readonly characterStyles: StylekitChacterStylesController;
        }

        /**
         * Controller for manipulating stylekit colors.
         */
        export interface StylekitColorsController {
            /**
             * Copies a stylekit color
             * @param fromName the color to use as source
             * @param toName the color to copy it to
             * @returns
             */
            copy(fromName: string, toName: string): void;
        }

        /**
         * Controller for manipulating stylekit paragraph styles.
         */
        export interface StylekitParagraphStylesController {
            /**
             * Copies a paragraph style
             * @param fromName the paragraph style to use as source
             * @param toName the paragraph style to copy it to
             * @returns
             */
            copy(fromName: string, toName: string): void;
        }

        /**
         * Controller for manipulating stylekit character styles.
         */
        export interface StylekitChacterStylesController {
            /**
             * Copies a character style
             * @param fromName the character style to use as source
             * @param toName the character style to copy it to
             * @returns
             */
            copy(fromName: string, toName: string): void;
        }
    }
}
