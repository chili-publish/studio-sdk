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
        const console: Console;
    }

    /**
     * The event types that can trigger an Action to be executed.
     */
    export enum TriggerEventType {
        selectedLayoutChanged = 'selectedLayoutChanged',
        frameMoved = 'frameMoved',
        variableValueChanged = 'variableValueChanged',
        pageSizeChanged = 'pageSizeChanged',
        documentLoaded = 'documentLoaded',
    }

    /**
     * An interface representing the trigger for executing this action.
     */
    export interface Triggers {
        /**
         * The event type that fired this trigger.
         */
        readonly type: TriggerEventType;

        /**
         * If the event was 'variableValueChanged', this will contain the
         * variable that caused the trigger to fire.
         */
        readonly changedVariable?: Variable;

        /**
         * If the event was 'selectedLayoutChanged', this will contain the
         * layout that caused the trigger to fire.
         */
        readonly changedLayout?: Layout;

        /**
         * If the event was 'frameMoved', this will contain the
         * frame that caused the trigger to fire.
         */
        readonly changedFrame?: Frame;

        /**
         * If the event was 'pageSizeChanged', this will contain the
         * page that caused the trigger to fire.
         */
        readonly changedPage?: Page;
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
     * Represents a Frame inside Actions
     */
    interface Frame {
        readonly name: string;
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
        readonly rotation: number;
        readonly included: boolean;
        readonly type: FrameType;
    }

    /**
     * Represents a Page inside Actions.
     */
    interface Page {
        width: number;
        height: number;
    }

    /**
     * Respresents a Layout inside Actions
     */
    interface Layout {
        readonly name: string;
    }

    /** Respresents a Variable inside Actions */
    type Variable = ShortTextVariable | LongTextVariable | FormattedTextVariable | ImageVariable | GroupVariable;

    enum VariableType {
        shortText = 'shortText',
        longText = 'longText',
        formattedText = 'formattedText',
        image = 'image',
        group = 'group',
    }

    enum FrameType {
        text = 'text',
        shape = 'shape',
        image = 'image',
    }

    /**
     * The different values a Variable can have depending on the Variable Type.
     */
    type VariableValue = string | boolean | number;

    interface BaseVariable {
        name: string;
        isVisible: boolean;
        isReadonly: boolean;
        isRequired: boolean;
        type: VariableType;
    }

    interface ShortTextVariable extends BaseVariable {
        type: VariableType.shortText;
        value: string;
    }

    interface LongTextVariable extends BaseVariable {
        type: VariableType.longText;
        value: string;
    }

    interface FormattedTextVariable extends BaseVariable {
        type: VariableType.formattedText;
        value: string;
    }

    interface ImageVariable extends BaseVariable {
        type: VariableType.image;
        assetId?: string;
    }

    interface GroupVariable extends BaseVariable {
        type: VariableType.group;
    }

    /**
     * Controller responsible for manipulating frames using Actions.
     */
    interface FramesController {
        /**
         * Moves a frame to a specified position
         * @param name the frame name to move
         * @param x the frame x position
         * @param y the frame y position
         * @returns
         */
        move(name: string, x: number, y: number): void;

        /**
         * Resizes a frame to a specified size
         * @param name the frame name to resize
         * @param width the frame width
         * @param height the frame height
         * @returns
         */
        resize(name: string, width: number, height: number): void;

        /**
         * Moves a frame to a specified X position
         * @param name the frame name to move
         * @param x the frame x position
         * @returns
         */
        setX(name: string, x: number): void;

        /**
         * Moves a frame to a specified Y position
         * @param name the frame name to move
         * @param y the frame y position
         * @returns
         */
        setY(name: string, y: number): void;

        /**
         * Resizes a frame to a specified width
         * @param name the frame name to resize
         * @param width the frame width
         * @returns
         */
        setWidth(name: string, width: number): void;

        /**
         * Resizes a frame to a specified height
         * @param name the frame name to resize
         * @param height the frame height
         * @returns
         */
        setHeight(name: string, height: number): void;

        /**
         * Rotates a frame to a specified degree
         * @param name the frame name to rotate
         * @param rotation the frame rotation in degrees
         * @returns
         */
        setRotation(name: string, rotation: number): void;

        /**
         * Toggles the frame visibility
         * @param name the frame name to include/exclude
         * @param include whether the frame is included or not
         * @returns
         */
        include(name: string, include: boolean): void;

        /**
         * Returns a list of all Frames
         * @returns
         */
        all(): Frame[];

        /**
         * Returns a specific frame by name
         * @param name the frame name
         * @returns
         */
        byName(name: string): Frame;

        /**
         * Assigns the specified image variable to the specified image frame
         * @param variableName the image variable name to assign
         * @param frameName the image frame name to assign to
         */
        assignVariable(variableName: string, frameName: string): void;
    }

    /**
     * Controller responsible for manipulating variables using Actions.
     */
    interface VariablesController {
        /**
         * Gets a variable by name
         * @param name the variable name
         * @returns
         */
        byName(name: string): Variable;

        /**
         * Returns a list of all variables
         * @returns
         */
        all(): Variable[];

        /**
         * Sets the value of a variable
         * @param name the variable name
         * @param value the value
         * @returns
         */
        setValue(name: string, value?: VariableValue): void;

        /**
         * Gets the value of a variable
         */
        getValue(name: string): VariableValue;

        /**
         * Set the readonly state of a variable
         * @param name the variable name
         * @param value whether the variable is readonly
         * @returns
         */
        setReadonly(name: string, value: boolean): void;

        /**
         * Set the required state of a variable
         * @param name the variable name
         * @param value whether the variable is required
         * @returns
         */
        setRequired(name: string, value: boolean): void;

        /**
         * Set the visible state of a variable
         * @param name the variable name
         * @param value whether the variable is visible
         * @returns
         */
        setVisible(name: string, value: boolean): void;
    }

    /**
     * Controller responsible for manipulating layouts using Actions.
     */
    interface LayoutsController {
        /**
         * Returns the selected layout
         * @returns
         */
        selected(): Layout;

        /**
         * Selects a layout by name
         * @param layoutName the layout name to select
         * @returns
         */
        select(layoutName: string): void;
    }

    /**
     * Controller responsible for manipulating pages using Actions.
     */
    interface PageController {
        /**
         * Gets the size of the page
         * @returns the page size
         */
        getSize(): Page;

        /**
         * Sets the size of the page
         * @param width the page width
         * @param height the page height
         * @returns
         */
        setSize(width: number, height: number): void;
    }

    /**
     *  Grouping stylekit entities.
     */
    interface Stylekit {
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
    interface StylekitColorsController {
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
    interface StylekitParagraphStylesController {
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
    interface StylekitChacterStylesController {
        /**
         * Copies a character style
         * @param fromName the character style to use as source
         * @param toName the character style to copy it to
         * @returns
         */
        copy(fromName: string, toName: string): void;
    }
}
