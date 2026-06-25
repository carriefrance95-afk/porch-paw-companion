import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePets } from '../context/PetContext';
import { FileText, Plus, Trash2, CheckCircle2, ClipboardList, Printer, MessageSquare, Camera, Video } from 'lucide-react';
import type { Attachment, DirectoryEntry, VetVisitPrep } from '../types';

const VetDiscussionHub: React.FC = () => {
  const { profiles, directory, vetVisitPreps, addVetVisitPrep, updateVetVisitPrep, deleteVetVisitPrep, medications, vaccines } = usePets();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDogId, setSelectedDogId] = useState(profiles[0]?.id || '');
  const [providerContext, setProviderContext] = useState<DirectoryEntry | null>(null);
  const [providerPrefillApplied, setProviderPrefillApplied] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [activePrepId, setActivePrepId] = useState<string | null>(null);

  // Form State for new/editing prep
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [symptoms, setSymptoms] = useState<string[]>(['']);
  const [questions, setQuestions] = useState<string[]>(['']);
  const [attachments, setAttachments] = useState<{ photos: Attachment[]; videos: Attachment[]; documents: Attachment[] }>({ photos: [], videos: [], documents: [] });
  const [notes, setNotes] = useState('');
  const [includeWeight, setIncludeWeight] = useState(true);
  const [includeMedications, setIncludeMedications] = useState(true);
  const [includeVaccines, setIncludeVaccines] = useState(true);
  const [summaryEditState, setSummaryEditState] = useState({ prepId: '', diagnosis: '', recommendations: '', completed: false });

  const activePrep = vetVisitPreps.find(p => p.id === activePrepId);
  const activeSummary = activePrep && summaryEditState.prepId === activePrep.id
    ? summaryEditState
    : {
        prepId: activePrep?.id || '',
        diagnosis: activePrep?.diagnosis || '',
        recommendations: activePrep?.recommendations || '',
        completed: !!activePrep?.completed,
      };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const providerId = params.get('providerId');
    if (!providerId || providerPrefillApplied) return;

    const provider = directory.find(item => item.id === providerId);
    if (!provider) return;

    setProviderContext(provider);
    setProviderPrefillApplied(true);
    navigate('/vet-visit-prep', { replace: true });
  }, [location.search, directory, providerPrefillApplied, navigate]);

  const handleCreate = () => {
    const newPrep: VetVisitPrep = {
      id: crypto.randomUUID(),
      dogId: selectedDogId,
      title: title || `Prep for ${providerContext?.name ?? 'Vet Visit'}`,
      date,
      symptoms: symptoms.filter(s => s.trim() !== ''),
      questions: questions.filter(q => q.trim() !== ''),
      notes: notes.trim() || undefined,
      photos: attachments.photos,
      videos: attachments.videos,
      documents: attachments.documents,
      includeWeightHistory: includeWeight,
      includeMedications: includeMedications,
      includeVaccines: includeVaccines,
      completed: false,
    };
    addVetVisitPrep(newPrep);
    setIsCreating(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDate(new Date().toISOString().split('T')[0]);
    setSymptoms(['']);
    setQuestions(['']);
    setAttachments({ photos: [], videos: [], documents: [] });
    setNotes('');
    setIncludeWeight(true);
    setIncludeMedications(true);
    setIncludeVaccines(true);
  };

  const addQuestionField = () => setQuestions([...questions, '']);
  const addSymptomField = () => setSymptoms([...symptoms, '']);

  const updateQuestion = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const updateSymptom = (index: number, value: string) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index] = value;
    setSymptoms(newSymptoms);
  };

  const addAttachmentItem = (type: keyof typeof attachments) => {
    setAttachments(prev => ({
      ...prev,
      [type]: [...prev[type], { id: crypto.randomUUID(), label: '', url: '' }]
    }));
  };

  const updateAttachmentItem = (type: keyof typeof attachments, index: number, key: 'label' | 'url', value: string) => {
    setAttachments(prev => ({
      ...prev,
      [type]: prev[type].map((item, idx) => idx === index ? { ...item, [key]: value } : item)
    }));
  };

  const removeAttachmentItem = (type: keyof typeof attachments, index: number) => {
    setAttachments(prev => ({
      ...prev,
      [type]: prev[type].filter((_, idx) => idx !== index)
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const savePrepUpdate = (updatedPrep: VetVisitPrep) => {
    updateVetVisitPrep(updatedPrep);
  };

  const completePrep = () => {
    if (!activePrep) return;
    savePrepUpdate({
      ...activePrep,
      completed: true,
      completedAt: activePrep.completedAt || new Date().toISOString(),
      diagnosis: activeSummary.diagnosis.trim() || undefined,
      recommendations: activeSummary.recommendations.trim() || undefined,
    });
    setSummaryEditState(prev => ({ ...prev, completed: true, prepId: activePrep.id }));
  };

  const handleSaveVisitSummary = () => {
    if (!activePrep) return;
    savePrepUpdate({
      ...activePrep,
      completed: activeSummary.completed,
      completedAt: activeSummary.completed ? (activePrep.completedAt || new Date().toISOString()) : undefined,
      diagnosis: activeSummary.diagnosis.trim() || undefined,
      recommendations: activeSummary.recommendations.trim() || undefined,
    });
    setSummaryEditState(prev => ({ ...prev, prepId: activePrep.id }));
  };

  const hasAttachments = activePrep ? ((activePrep.photos?.length ?? 0) + (activePrep.videos?.length ?? 0) + (activePrep.documents?.length ?? 0)) > 0 : false;

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardList className="text-primary" />
            Vet Discussion Hub
          </h2>
          <p className="text-sm opacity-60">Prepare questions and summaries for your next vet visit.</p>
          {providerContext && (
            <div className="mt-3 rounded-3xl border border-info/20 bg-info/5 p-4 text-sm text-info-content">
              <strong>Provider selected:</strong> {providerContext.name} — {providerContext.category}
              {providerContext.phone && (
                <span className="block mt-1">Contact: <a href={`tel:${providerContext.phone}`} className="underline">{providerContext.phone}</a></span>
              )}
            </div>
          )}
        </div>
        {!isCreating && (
          <button 
            onClick={() => setIsCreating(true)} 
            className="btn btn-primary rounded-2xl gap-2"
          >
            <Plus size={20} /> Create New Prep
          </button>
        )}
      </div>

      {isCreating ? (
        <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm space-y-6 animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">New Preparation</h3>
            <button onClick={() => setIsCreating(false)} className="btn btn-ghost btn-sm">Cancel</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Select Dog</span></label>
              <select 
                className="select select-bordered rounded-xl"
                value={selectedDogId}
                onChange={(e) => setSelectedDogId(e.target.value)}
              >
                {profiles.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Visit Date</span></label>
              <input 
                type="date" className="input input-bordered rounded-xl" 
                value={date} onChange={e => setDate(e.target.value)} 
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Purpose of Visit</span></label>
            <input 
              type="text" placeholder="e.g., Annual Checkup, Limping, Allergy check" 
              className="input input-bordered rounded-xl"
              value={title} onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <label className="label"><span className="label-text font-bold">Symptoms & Observations</span></label>
              {symptoms.map((s, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Symptom ${idx + 1}`}
                    className="input input-bordered rounded-xl flex-1"
                    value={s}
                    onChange={(e) => updateSymptom(idx, e.target.value)}
                  />
                </div>
              ))}
              <button onClick={addSymptomField} className="btn btn-ghost btn-sm text-primary gap-2">
                <Plus size={16} /> Add Another Symptom
              </button>
            </div>
            <div className="space-y-3">
              <label className="label"><span className="label-text font-bold">Questions for the Vet</span></label>
              {questions.map((q, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Question ${idx + 1}`}
                    className="input input-bordered rounded-xl flex-1"
                    value={q}
                    onChange={(e) => updateQuestion(idx, e.target.value)}
                  />
                </div>
              ))}
              <button onClick={addQuestionField} className="btn btn-ghost btn-sm text-primary gap-2">
                <Plus size={16} /> Add Another Question
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="bg-base-200 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] mb-3">
                <Camera size={16} /> Photos
              </div>
              {(attachments.photos || []).map((attachment, idx) => (
                <div key={attachment.id} className="grid gap-3 sm:grid-cols-[1fr_auto] items-end mb-3">
                  <input type="text" className="input input-bordered rounded-2xl bg-white" placeholder="Label" value={attachment.label} onChange={e => updateAttachmentItem('photos', idx, 'label', e.target.value)} />
                  <input type="url" className="input input-bordered rounded-2xl bg-white" placeholder="Image URL" value={attachment.url} onChange={e => updateAttachmentItem('photos', idx, 'url', e.target.value)} />
                  <button type="button" className="btn btn-ghost btn-sm rounded-full" onClick={() => removeAttachmentItem('photos', idx)}>Remove</button>
                </div>
              ))}
              <button type="button" className="btn btn-outline btn-sm rounded-full w-full" onClick={() => addAttachmentItem('photos')}>
                <Plus size={14} /> Add Photo
              </button>
            </div>
            <div className="bg-base-200 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] mb-3">
                <Video size={16} /> Videos
              </div>
              {(attachments.videos || []).map((attachment, idx) => (
                <div key={attachment.id} className="grid gap-3 sm:grid-cols-[1fr_auto] items-end mb-3">
                  <input type="text" className="input input-bordered rounded-2xl bg-white" placeholder="Label" value={attachment.label} onChange={e => updateAttachmentItem('videos', idx, 'label', e.target.value)} />
                  <input type="url" className="input input-bordered rounded-2xl bg-white" placeholder="Video URL" value={attachment.url} onChange={e => updateAttachmentItem('videos', idx, 'url', e.target.value)} />
                  <button type="button" className="btn btn-ghost btn-sm rounded-full" onClick={() => removeAttachmentItem('videos', idx)}>Remove</button>
                </div>
              ))}
              <button type="button" className="btn btn-outline btn-sm rounded-full w-full" onClick={() => addAttachmentItem('videos')}>
                <Plus size={14} /> Add Video
              </button>
            </div>
            <div className="bg-base-200 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] mb-3">
                <FileText size={16} /> Documents
              </div>
              {(attachments.documents || []).map((attachment, idx) => (
                <div key={attachment.id} className="grid gap-3 sm:grid-cols-[1fr_auto] items-end mb-3">
                  <input type="text" className="input input-bordered rounded-2xl bg-white" placeholder="Label" value={attachment.label} onChange={e => updateAttachmentItem('documents', idx, 'label', e.target.value)} />
                  <input type="url" className="input input-bordered rounded-2xl bg-white" placeholder="Document URL" value={attachment.url} onChange={e => updateAttachmentItem('documents', idx, 'url', e.target.value)} />
                  <button type="button" className="btn btn-ghost btn-sm rounded-full" onClick={() => removeAttachmentItem('documents', idx)}>Remove</button>
                </div>
              ))}
              <button type="button" className="btn btn-outline btn-sm rounded-full w-full" onClick={() => addAttachmentItem('documents')}>
                <Plus size={14} /> Add Document
              </button>
            </div>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Visit Notes</span></label>
            <textarea className="textarea textarea-bordered rounded-2xl h-32" placeholder="Add context or details ahead of the visit" value={notes} onChange={e => setNotes(e.target.value)} />
          </div>

          <div className="bg-base-200 p-4 rounded-2xl space-y-3">
            <p className="text-xs font-bold uppercase opacity-50 px-1">Include in Summary</p>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" checked={includeWeight} onChange={e => setIncludeWeight(e.target.checked)} />
                <span className="text-sm">Weight History</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" checked={includeMedications} onChange={e => setIncludeMedications(e.target.checked)} />
                <span className="text-sm">Active Medications</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" checked={includeVaccines} onChange={e => setIncludeVaccines(e.target.checked)} />
                <span className="text-sm">Recent Vaccines</span>
              </label>
            </div>
          </div>

          <button onClick={handleCreate} className="btn btn-primary w-full rounded-2xl">Save Preparation</button>
        </div>
      ) : activePrep ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-base-100 p-8 rounded-3xl border border-base-300 shadow-sm print:shadow-none print:border-none print:p-0">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="avatar placeholder">
                      <div className="bg-primary text-primary-content rounded-xl w-12">
                        <span className="text-xl font-bold">{profiles.find(p => p.id === activePrep.dogId)?.name[0]}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black">{activePrep.title}</h3>
                      <p className="opacity-60">{profiles.find(p => p.id === activePrep.dogId)?.name} • {new Date(activePrep.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 print:hidden">
                  <button onClick={handlePrint} className="btn btn-circle btn-ghost"><Printer size={20} /></button>
                  <button onClick={() => setActivePrepId(null)} className="btn btn-circle btn-ghost">✕</button>
                </div>
              </div>

              <div className="space-y-8">
                <section>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                    <MessageSquare size={16} /> Questions to Ask
                  </h4>
                  <ul className="space-y-3">
                    {activePrep.questions.map((q, idx) => (
                      <li key={idx} className="flex gap-3 items-start p-4 bg-base-200 rounded-2xl font-medium">
                        <span className="bg-primary text-primary-content text-[10px] w-5 h-5 flex items-center justify-center rounded-full shrink-0 mt-0.5">{idx + 1}</span>
                        {q}
                      </li>
                    ))}
                  </ul>
                </section>

                {activePrep.symptoms.length > 0 && (
                  <section>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Symptoms & Observations</h4>
                    <div className="grid gap-3">
                      {activePrep.symptoms.map((symptom, idx) => (
                        <div key={idx} className="p-4 bg-base-200 rounded-2xl text-sm">
                          <span className="font-semibold">{idx + 1}.</span> {symptom}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {activePrep.notes && (
                  <section>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Pre-Visit Notes</h4>
                    <div className="p-4 bg-base-200 rounded-2xl text-sm leading-relaxed">
                      {activePrep.notes}
                    </div>
                  </section>
                )}

                {hasAttachments && (
                  <section>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Attachments</h4>
                    <div className="space-y-4">
                      {activePrep.photos?.length ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-primary"><Camera size={16} /> Photos</div>
                          <div className="grid gap-2">
                            {activePrep.photos.map(photo => (
                              <a key={photo.id} href={photo.url} target="_blank" rel="noreferrer" className="p-4 bg-base-200 rounded-2xl block text-sm hover:bg-base-300">
                                {photo.label || 'Photo attachment'}
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {activePrep.videos?.length ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-primary"><Video size={16} /> Videos</div>
                          <div className="grid gap-2">
                            {activePrep.videos.map(video => (
                              <a key={video.id} href={video.url} target="_blank" rel="noreferrer" className="p-4 bg-base-200 rounded-2xl block text-sm hover:bg-base-300">
                                {video.label || 'Video attachment'}
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {activePrep.documents?.length ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-primary"><FileText size={16} /> Documents</div>
                          <div className="grid gap-2">
                            {activePrep.documents.map(doc => (
                              <a key={doc.id} href={doc.url} target="_blank" rel="noreferrer" className="p-4 bg-base-200 rounded-2xl block text-sm hover:bg-base-300">
                                {doc.label || 'Document attachment'}
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </section>
                )}

                {(activePrep.diagnosis || activePrep.recommendations || activePrep.completedAt) && (
                  <section>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Visit Summary</h4>
                    <div className="space-y-4">
                      {activePrep.completedAt && (
                        <div className="p-4 bg-base-200 rounded-2xl text-sm">
                          <span className="font-semibold">Completed:</span> {new Date(activePrep.completedAt).toLocaleDateString()}
                        </div>
                      )}
                      {activePrep.diagnosis && (
                        <div className="p-4 bg-base-200 rounded-2xl">
                          <h5 className="text-sm font-bold mb-2">Diagnosis / Findings</h5>
                          <p className="text-sm leading-relaxed">{activePrep.diagnosis}</p>
                        </div>
                      )}
                      {activePrep.recommendations && (
                        <div className="p-4 bg-base-200 rounded-2xl">
                          <h5 className="text-sm font-bold mb-2">Recommendations</h5>
                          <p className="text-sm leading-relaxed">{activePrep.recommendations}</p>
                        </div>
                      )}
                    </div>
                  </section>
                )}

                {activePrep.includeWeightHistory && (
                  <section>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Recent Weight Log</h4>
                    <div className="overflow-hidden rounded-2xl border border-base-300">
                      <table className="table table-sm w-full">
                        <thead className="bg-base-200">
                          <tr><th>Date</th><th>Weight</th></tr>
                        </thead>
                        <tbody>
                          {(profiles.find(p => p.id === activePrep.dogId)?.weightHistory || []).slice(0, 3).map(w => (
                            <tr key={w.id}><td>{new Date(w.date).toLocaleDateString()}</td><td className="font-bold">{w.weight} kg</td></tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                )}

                {activePrep.includeMedications && (
                  <section>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Current Medications</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {medications.filter(m => m.dogId === activePrep.dogId && m.active).map(m => (
                        <div key={m.id} className="p-4 rounded-2xl border border-base-300">
                          <p className="font-bold">{m.name}</p>
                          <p className="text-xs opacity-60">{m.dosage} • {m.frequency}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {activePrep.includeVaccines && (
                  <section>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Recent Vaccines</h4>
                    <div className="space-y-2">
                      {vaccines.filter(v => v.dogId === activePrep.dogId).slice(0, 3).map(v => (
                        <div key={v.id} className="flex justify-between p-3 bg-base-200 rounded-xl text-sm">
                          <span>{v.vaccineName}</span>
                          <span className="font-medium">{new Date(v.dateAdministered).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4 print:hidden">
            <div className="bg-base-100 p-6 rounded-3xl border border-base-300 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Visit Summary</h4>
                  <p className="text-xs opacity-60">Record diagnosis and recommendations after the visit.</p>
                </div>
                <span className={`badge ${activePrep.completed ? 'badge-success' : 'badge-outline'}`}>
                  {activePrep.completed ? 'Completed' : 'Pending'}
                </span>
              </div>

              <label className="label justify-start gap-3 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-primary" checked={activeSummary.completed} onChange={e => setSummaryEditState(prev => ({ ...prev, completed: e.target.checked, prepId: activePrep?.id || prev.prepId }))} />
                <span className="label-text">Mark visit summary complete</span>
              </label>

              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Diagnosis / Findings</span></label>
                <textarea className="textarea textarea-bordered rounded-2xl h-28" placeholder="Enter diagnosis or vet observations" value={activeSummary.diagnosis} onChange={e => setSummaryEditState(prev => ({ ...prev, diagnosis: e.target.value, prepId: activePrep?.id || prev.prepId }))} />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Recommendations</span></label>
                <textarea className="textarea textarea-bordered rounded-2xl h-28" placeholder="Enter follow-up recommendations or care instructions" value={activeSummary.recommendations} onChange={e => setSummaryEditState(prev => ({ ...prev, recommendations: e.target.value, prepId: activePrep?.id || prev.prepId }))} />
              </div>

              <button onClick={handleSaveVisitSummary} className="btn btn-primary w-full rounded-2xl">Save Visit Summary</button>
              {!activePrep.completed && (
                <button onClick={completePrep} className="btn btn-outline btn-success w-full rounded-2xl">Mark Completed</button>
              )}
              {activePrep.completedAt && (
                <p className="text-xs opacity-60 mt-2">Completed on {new Date(activePrep.completedAt).toLocaleDateString()}</p>
              )}
            </div>

            <div className="bg-primary text-primary-content p-6 rounded-3xl">
              <h4 className="font-bold mb-2">Vet Visit Tip</h4>
              <p className="text-sm opacity-90 leading-relaxed">
                Be sure to mention any changes in appetite, energy levels, or bowel movements—even if they seem minor!
              </p>
            </div>
            <button 
              onClick={() => deleteVetVisitPrep(activePrep.id)} 
              className="btn btn-outline btn-error w-full rounded-2xl gap-2"
            >
              <Trash2 size={18} /> Delete this Prep
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {vetVisitPreps.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-base-100 rounded-3xl border-2 border-dashed border-base-300 opacity-50">
              <ClipboardList size={48} className="mx-auto mb-4" />
              <p className="text-lg font-medium">No visit preparations yet.</p>
              <p className="text-sm">Click the button above to get ready for your next vet appointment.</p>
            </div>
          ) : (
            vetVisitPreps.map(prep => {
              const dog = profiles.find(p => p.id === prep.dogId);
              return (
                <div 
                  key={prep.id} 
                  className="bg-base-100 p-5 rounded-3xl border border-base-300 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => setActivePrepId(prep.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors`}>
                      <FileText size={24} />
                    </div>
                    <span className="text-xs font-bold opacity-40">{new Date(prep.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-black text-lg mb-1">{prep.title}</h3>
                  <p className="text-sm opacity-60 mb-4">{dog?.name || 'Unknown Pet'}</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-primary">
                    <CheckCircle2 size={14} /> {prep.questions.length} Questions Prepared
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default VetDiscussionHub;
