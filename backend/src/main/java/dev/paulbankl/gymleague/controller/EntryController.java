package dev.paulbankl.gymleague.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import dev.paulbankl.gymleague.dto.EntryChangeDTO;
import dev.paulbankl.gymleague.dto.EntryCreationDTO;
import dev.paulbankl.gymleague.dto.ResponseDTOs.EntryDTO;
import dev.paulbankl.gymleague.model.Entry;
import dev.paulbankl.gymleague.service.EntryService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestMapping;






@RestController
@RequestMapping("/api/entry")
public class EntryController {
	private final EntryService EntryService;
    
	public EntryController(EntryService entryService) {
		this.EntryService = entryService;
	}
	@GetMapping()
	public ResponseEntity<List<EntryDTO>> getEntries() {
		return ResponseEntity.ok(EntryService.getAllEntries());
	}

	@GetMapping("/{id}")
	public ResponseEntity<EntryDTO> getEntryById(@PathVariable Long id) {
		EntryDTO entry = EntryService.getEntryById(id);
		return ResponseEntity.ok(entry);
	}

	@PostMapping("/add")
    public ResponseEntity<Void> addEntry(@Valid @RequestBody EntryCreationDTO entryDTO, Authentication authentication) {
		EntryService.insertEntry(entryDTO, authentication.getName());
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	@PutMapping("/change")
	public ResponseEntity<Void> updateEntry(@Valid @RequestBody EntryChangeDTO entryChangeDTO, Authentication authentication) {
		
		EntryService.updateEntry(entryChangeDTO, authentication.getName());
		return ResponseEntity.noContent().build();
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteEntry(@PathVariable Long id, Authentication authentication) {
		EntryService.deleteEntry(id, authentication.getName());
		return ResponseEntity.noContent().build();
	}
	@GetMapping("/all/{exerciseid}")
	public ResponseEntity<List<EntryDTO>> getMethodName( @PathVariable Long exerciseid, Authentication authentication) {
		return ResponseEntity.ok(EntryService.getEntryDTOForUserAndExercise(exerciseid, authentication.getName()));
	
}
	@GetMapping("/best/{exerciseid}")
	public ResponseEntity<EntryDTO> getBestEntry(@PathVariable Long exerciseid, Authentication authentication) {
		Entry best= EntryService.getBestEntryForUserAndExercise(exerciseid, authentication.getName());
		if (best == null) {
        return ResponseEntity.noContent().build();
    }

		return ResponseEntity.ok().body(EntryService.getEntryById(best.getId()));
	}

}


