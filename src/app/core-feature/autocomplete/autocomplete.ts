import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  standalone: false,
  templateUrl: './autocomplete.html',
  styleUrl: './autocomplete.css'
})
export class Autocomplete {
  myControl = new FormControl('');
  options: string[] = ['Angular', 'React', 'Vue', 'JavaScript', 'TypeScript', 'HTML', 'CSS'];
  filteredOptions!: Observable<string[]>;

  // New properties for additional features
  selectedOptions: string[] = [];
  showSelectedOnly = false;
  viewMode: 'list' | 'grid' = 'list';
  selectAll = false;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  // Toggle selection for an option
  toggleSelection(option: string): void {
    const index = this.selectedOptions.indexOf(option);
    if (index > -1) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(option);
    }
  }

  // Check if option is selected
  isSelected(option: string): boolean {
    return this.selectedOptions.includes(option);
  }

  // Toggle select all
  toggleSelectAll(): void {
    if (this.selectAll) {
      this.selectedOptions = [...this.options];
    } else {
      this.selectedOptions = [];
    }
  }

  // Clear all selections
  clearSelections(): void {
    this.selectedOptions = [];
    this.selectAll = false;
  }

  // Get filtered options based on showSelectedOnly toggle
  getDisplayedOptions(): string[] {
    if (this.showSelectedOnly && this.selectedOptions.length > 0) {
      return this.selectedOptions;
    }
    return this.options;
  }
}
