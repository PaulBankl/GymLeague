package dev.paulbankl.gymleague.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import dev.paulbankl.gymleague.model.Entry;
import dev.paulbankl.gymleague.service.EntryService;

import org.springframework.web.bind.annotation.RequestMapping;




@RestController
@RequestMapping("api/entry")
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

	@PostMapping()
    public void addEntry(@RequestBody Entry entry) {
		EntryService.insertEntry(entry);
	}
	
}