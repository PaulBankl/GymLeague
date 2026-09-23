package dev.paulbankl.gymleague.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import org.springframework.web.bind.annotation.RequestParam;





@RestController
@RequestMapping("api/entry")
public class EntryController {
	private final EntryService EntryService;
    
	public EntryController(EntryService entryService) {
		this.EntryService = entryService;
	}
	@GetMapping()
	public List<EntryDTO> getEntries() {
		return EntryService.getAllEntries();
	}

	@GetMapping("/{id}")
	public EntryDTO getEntryById(@PathVariable Long id) {
		return EntryService.getEntryById(id);
	}

	@PostMapping("/add")
    public boolean addEntry(@Valid @RequestBody EntryCreationDTO entryDTO, Authentication authentication) {
		return EntryService.insertEntry(entryDTO, authentication.getName());
	}
	
	@PutMapping("/change")
	public boolean updateEntry(@Valid @RequestBody EntryChangeDTO entryChangeDTO, Authentication authentication) {
		
		return EntryService.updateEntry(entryChangeDTO, authentication.getName());
	}
	@DeleteMapping("/{id}")
	public boolean deleteEntry(@PathVariable Long id, Authentication authentication) {
		return EntryService.deleteEntry(id, authentication.getName());
	}
	@GetMapping("/all/{exerciseid}")
	public List<EntryDTO> getMethodName( @PathVariable Long exerciseid, Authentication authentication) {
		return EntryService.getEntryDTOForUserAndExercise(exerciseid, authentication.getName());
	
}
	@GetMapping("/best/{exerciseid}")
	public ResponseEntity<EntryDTO> getBestEntry(@PathVariable Long exerciseid, Authentication authentication) {
		Entry best= EntryService.getBestEntryForUserAndExercise(exerciseid, authentication.getName());
		if(best == null) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok().body(EntryService.getEntryById(best.getId()));
	}

}


