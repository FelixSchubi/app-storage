/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   app-storage-behavior.html
 */

/// <reference path="../polymer/types/polymer.d.ts" />

declare namespace Polymer {

  /**
   * AppStorageBehavior is an abstract behavior that makes it easy to
   * synchronize in-memory data and a persistent storage system, such as
   * the browser's IndexedDB, or a remote database like Firebase.
   *
   * For examples of how to use this behavior to write your own app storage
   * elements see `<app-localstorage-document>` here, or check out
   * [polymerfire](https://github.com/Firebase/polymerfire) and
   * [app-pouchdb](https://github.com/PolymerElements/app-pouchdb).
   */
  interface AppStorageBehavior {

    /**
     * The data to synchronize.
     */
    data: object|null|undefined;

    /**
     * If this is true transactions will happen one after the other,
     * never in parallel.
     *
     * Specifically, no transaction will begin until every previously
     * enqueued transaction by this element has completed.
     *
     * If it is false, new transactions will be executed as they are
     * received.
     */
    sequentialTransactions: boolean|null|undefined;

    /**
     * When true, will perform detailed logging.
     */
    log: boolean|null|undefined;

    /**
     * Override this getter to return true if the value has never been
     * persisted to storage.
     */
    readonly isNew: any;

    /**
     * A promise that will resolve once all queued transactions
     * have completed.
     *
     * This field is updated as new transactions are enqueued, so it will
     * only wait for transactions which were enqueued when the field
     * was accessed.
     *
     * This promise never rejects.
     */
    readonly transactionsComplete: any;

    /**
     * Override this getter to define the default value to use when
     * there's no data stored.
     */
    readonly zeroValue: any;
    created(): void;
    ready(): void;

    /**
     * Override this method.
     *
     * If the data value represented by this storage instance is new, this
     * method generates an attempt to write the value to storage.
     *
     * @returns a Promise that settles only once the write has.
     */
    saveValue(args: any): Promise<any>|null;

    /**
     * Optional. Override this method to clear out the mapping of this
     * storage object and a logical location within storage.
     *
     * If this method is supported, after it's called, isNew() should be
     * true.
     */
    reset(): void;

    /**
     * Remove the data from storage.
     *
     * @returns A promise that settles once the destruction is
     *   complete.
     */
    destroy(): Promise<any>|null;

    /**
     * Perform the initial sync between storage and memory. This method
     * is called automatically while the element is being initialized.
     * Implementations may override it.
     *
     * If an implementation intends to call this method, it should instead
     * call _initializeStoredValue, which provides reentrancy protection.
     *
     * @returns A promise that settles once this process is
     *     complete.
     */
    initializeStoredValue(): Promise<any>|null;

    /**
     * Override this method to implement reading a value from storage.
     *
     * @param storagePath The path (through storage) of the value to
     *   create, relative to the root of storage associated with this instance.
     * @returns A promise that resolves with the canonical value stored
     *   at the provided path when the transaction has completed. _If there is no
     *   such value at the provided path through storage, then the promise will
     *   resolve to `undefined`._ The promise will be rejected if the transaction
     *   fails for any reason.
     */
    getStoredValue(storagePath: string): Promise<any>|null;

    /**
     * Override this method to implement creating and updating
     * stored values.
     *
     * @param storagePath The path of the value to update, relative
     *   to the root storage path configured for this instance.
     * @param value The updated in-memory value to apply to the stored value
     *   at the provided path.
     * @returns A promise that resolves with the canonical value stored
     *   at the provided path when the transaction has completed. The promise
     *   will be rejected if the transaction fails for any reason.
     */
    setStoredValue(storagePath: string, value: any): Promise<any>|null;

    /**
     * Maps a Polymer databinding path to the corresponding path in the
     * storage system. Override to define a custom mapping.
     *
     * The inverse of storagePathToMemoryPath.
     *
     * @param path An in-memory path through a storage object.
     * @returns The provided path mapped to the equivalent location in
     *   storage. This mapped version of the path is suitable for use with the
     *   CRUD operations on both memory and storage.
     */
    memoryPathToStoragePath(path: string): string;

    /**
     * Maps a storage path to the corresponding Polymer databinding path.
     * Override to define a custom mapping.
     *
     * The inverse of memoryPathToStoragePath.
     *
     * @param path The storage path through a storage object.
     * @returns The provided path through storage mapped to the
     *   equivalent Polymer path through the in-memory representation of storage.
     */
    storagePathToMemoryPath(path: string): string;

    /**
     * Enables performing transformations on the in-memory representation of
     * storage without activating observers that will cause those
     * transformations to be re-applied to the storage backend. This is useful
     * for preventing redundant (or cyclical) application of transformations.
     *
     * @param operation A function that will perform the desired
     *   transformation. It will be called synchronously, when it is safe to
     *   apply the transformation.
     */
    syncToMemory(operation: Function|null): void;

    /**
     * A convenience method. Returns true iff value is null, undefined,
     * an empty array, or an object with no keys.
     */
    valueIsEmpty(value: any): any;

    /**
     * Like `getStoredValue` but called with a Polymer path rather than
     * a storage path.
     *
     * @param path The Polymer path to get.
     * @returns A Promise of the value stored at that path.
     */
    _getStoredValue(path: string): Promise<any>|null;

    /**
     * Like `setStoredValue` but called with a Polymer path rather than
     * a storage path.
     *
     * @param path The Polymer path to update.
     * @param value The updated in-memory value to apply to the stored value
     *   at the provided path.
     * @returns A promise that resolves with the canonical value stored
     *   at the provided path when the transaction has completed. The promise
     *   will be rejected if the transaction fails for any reason.
     */
    _setStoredValue(path: string, value: any): Promise<any>|null;

    /**
     * Enqueues the given function in the transaction queue.
     *
     * The transaction queue allows for optional parallelism/sequentiality
     * via the `sequentialTransactions` boolean property, as well as giving
     * the user a convenient way to wait for all pending transactions to
     * finish.
     *
     * The given function may be called immediately or after an arbitrary
     * delay. Its `this` context will be bound to the element.
     *
     * If the transaction performs any asynchronous operations it must
     * return a promise.
     *
     * @param transaction A function implementing the transaction.
     * @returns A promise that resolves once the transaction has
     *   finished. This promise will never reject.
     */
    _enqueueTransaction(transaction: Function|null): Promise<any>|null;

    /**
     * A wrapper around `console.log`.
     */
    _log(): void;

    /**
     * A wrapper around `console.error`.
     */
    _error(): void;

    /**
     * A wrapper around `console.group`.
     */
    _group(): void;

    /**
     * A wrapper around `console.groupEnd`.
     */
    _groupEnd(): void;

    /**
     * A reentrancy-save wrapper around `this.initializeStoredValue`.
     * Prefer calling this method over that one.
     *
     * @returns The result of calling `initializeStoredValue`,
     *   or `undefined` if called while initializing.
     */
    _initializeStoredValue(): Promise<any>|null;
  }

  const AppStorageBehavior: object;
}
