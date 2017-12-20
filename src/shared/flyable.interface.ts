import { Movable } from './movable.interface';

export interface Flyable extends Movable {
	up(): void;
	down(): void;
}