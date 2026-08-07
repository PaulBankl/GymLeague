package dev.paulbankl.gymleague.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dev.paulbankl.gymleague.model.Entry;
import dev.paulbankl.gymleague.repository.EntryRepository;

@Service
public class EntryService {
    private final EntryRepository entryRepository;

    public EntryService(EntryRepository entryRepository) {
        this.entryRepository = entryRepository;
    }
    public List<Entry> getAllEntries() {
        return entryRepository.findAll();
    }
    public void insertEntry(Entry entry) {
        entryRepository.save(entry);
    }
    public Entry getEntryById(Long id) {
        return entryRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Entry with id " + id + " not found"));
    }
}