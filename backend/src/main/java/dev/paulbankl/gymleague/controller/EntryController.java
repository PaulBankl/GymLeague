package dev.paulbankl.gymleague.controller;

import java.util.List;

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
import dev.paulbankl.gymleague.model.Entry;
import dev.paulbankl.gymleague.service.EntryService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;





@RestController
@RequestMapping("api/entry")
@CrossOrigin(origins = "http://localhost:5173")
public class EntryController {
	private final EntryService EntryService;
    
	public EntryController(EntryService entryService) {
		this.EntryService = entryService;
	}
	@GetMapping()
	public List<Entry> getEntries() {
		return EntryService.getAllEntries();
	}

	@GetMapping("/{id}")
	public Entry getEntryById(@PathVariable Long id) {
		return EntryService.getEntryById(id);
	}

	@PostMapping("/add")
    public void addEntry(@RequestBody EntryCreationDTO entryDTO) {
		EntryService.insertEntry(entryDTO);
	}
	@PutMapping("/change")
	public boolean updateEntry(@RequestBody EntryChangeDTO entryChangeDTO) {
		
		return EntryService.updateEntry(entryChangeDTO);
	}
	@DeleteMapping("/{id}")
	public boolean deleteEntry(@PathVariable Long id) {
		return EntryService.deleteEntry(id);
	}
	@GetMapping("/all/{exerciseid}")
	public List<Entry> getMethodName( @PathVariable Long exerciseid, @RequestParam String username) {
		return EntryService.getEntryforUserAndExercise(exerciseid, username);
	
}
}