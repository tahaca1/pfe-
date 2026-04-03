import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, TrendingUp, X, Info } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { ChatMessage, Recommendation } from '@/types';
import { mockChatMessages, quickSuggestions } from '@/data/mockData';

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState<Recommendation | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Voici mon analyse basée sur les données actuelles du marché et votre profil investisseur. Les informations présentées sont à titre indicatif et ne constituent pas un conseil financier personnalisé.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#0A2647]">Assistant IA</h1>
        <p className="text-[#64748B]">
          Posez vos questions sur l'investissement et la bourse
        </p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden p-0">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0A2647] to-[#1E3A8A] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#EAB308]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="M18 9l-5-6-4 8-3-2" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-[#1E293B]">InvestAI Sophia</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
                <span className="text-sm text-[#64748B]">En ligne</span>
              </div>
            </div>
          </div>
          <Badge variant="info">
            <Sparkles className="w-3 h-3 mr-1" />
            Powered by GPT-4
          </Badge>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              } animate-fade-in`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0A2647] to-[#1E3A8A] flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#EAB308]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3v18h18" />
                    <path d="M18 9l-5-6-4 8-3-2" />
                  </svg>
                </div>
              )}

              <div
                className={`max-w-[70%] ${
                  message.role === 'user'
                    ? 'bg-[#0A2647] text-white rounded-2xl rounded-tr-sm'
                    : 'bg-[#F1F5F9] text-[#1E293B] rounded-2xl rounded-tl-sm'
                } px-4 py-3`}
              >
                <p className="leading-relaxed">{message.content}</p>

                {message.recommendation && (
                  <div
                    className={`mt-4 p-4 rounded-lg ${
                      message.role === 'user' ? 'bg-white/10' : 'bg-white border border-[#E2E8F0]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            message.recommendation.action === 'buy'
                              ? 'success'
                              : message.recommendation.action === 'sell'
                              ? 'danger'
                              : 'warning'
                          }
                        >
                          {message.recommendation.action === 'buy'
                            ? 'ACHAT'
                            : message.recommendation.action === 'sell'
                            ? 'VENTE'
                            : 'CONSERVER'}
                        </Badge>
                        <span className="text-xs text-[#64748B]">
                          {message.recommendation.analysisType === 'technical'
                            ? 'Analyse technique'
                            : message.recommendation.analysisType === 'fundamental'
                            ? 'Analyse fondamentale'
                            : 'Analyse mixte'}
                        </span>
                      </div>
                      <span className="text-xs text-[#64748B]">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-[#0A2647]/10 flex items-center justify-center">
                        <span className="font-bold text-[#0A2647]">
                          {message.recommendation.symbol.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{message.recommendation.symbol}</p>
                        <p className="text-sm text-[#64748B]">
                          {message.recommendation.name}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-[#64748B]">Prix actuel</p>
                        <p className="font-mono font-medium">
                          ${message.recommendation.currentPrice.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#64748B]">Objectif</p>
                        <p className="font-mono font-medium text-[#10B981]">
                          ${message.recommendation.targetPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#EAB308]" />
                        <span className="text-sm">
                          Confiance: {message.recommendation.confidenceScore}%
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant={message.role === 'user' ? 'outline' : 'secondary'}
                        onClick={() => setShowRecommendation(message.recommendation)}
                      >
                        Détails
                      </Button>
                    </div>
                  </div>
                )}

                <p
                  className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-white/60' : 'text-[#64748B]'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#EAB308] flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-[#0A2647]">TM</span>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0A2647] to-[#1E3A8A] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#EAB308]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="M18 9l-5-6-4 8-3-2" />
                </svg>
              </div>
              <div className="bg-[#F1F5F9] rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-[#64748B] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-[#64748B] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-[#64748B] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="px-6 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1.5 text-sm rounded-full bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#0A2647] hover:text-[#0A2647] transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question..."
                rows={1}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-[#1E293B] placeholder-[#64748B] resize-none focus:outline-none focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/20"
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Send className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-[#64748B]">
            <Info className="w-3 h-3" />
            <span>Les recommandations sont générées par IA et ne constituent pas un conseil financier personnalisé.</span>
          </div>
        </div>
      </Card>

      {showRecommendation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowRecommendation(null)}
          />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white flex items-center justify-between p-4 border-b border-[#E2E8F0]">
              <h3 className="text-lg font-semibold text-[#0A2647]">
                Analyse détaillée
              </h3>
              <button
                onClick={() => setShowRecommendation(null)}
                className="p-1 rounded-lg hover:bg-[#E2E8F0] transition-colors"
              >
                <X className="w-5 h-5 text-[#64748B]" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#0A2647]/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-[#0A2647]">
                    {showRecommendation.symbol.slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold">{showRecommendation.symbol}</h4>
                  <p className="text-[#64748B]">{showRecommendation.name}</p>
                </div>
                <Badge
                  variant={
                    showRecommendation.action === 'buy'
                      ? 'success'
                      : showRecommendation.action === 'sell'
                      ? 'danger'
                      : 'warning'
                  }
                  size="md"
                >
                  {showRecommendation.action === 'buy'
                    ? 'ACHAT'
                    : showRecommendation.action === 'sell'
                    ? 'VENTE'
                    : 'CONSERVER'}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-[#F8FAFC] rounded-lg">
                <div>
                  <p className="text-sm text-[#64748B]">Prix actuel</p>
                  <p className="text-xl font-mono font-semibold">
                    ${showRecommendation.currentPrice.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#64748B]">Prix cible</p>
                  <p className="text-xl font-mono font-semibold text-[#10B981]">
                    ${showRecommendation.targetPrice.toFixed(2)}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#64748B]">Score de confiance</span>
                  <span className="font-medium">{showRecommendation.confidenceScore}%</span>
                </div>
                <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0A2647] to-[#10B981] rounded-full"
                    style={{ width: `${showRecommendation.confidenceScore}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-[#1E293B]">Points clés de l'analyse</h5>
                <ul className="space-y-2 text-sm text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full mt-1.5 flex-shrink-0" />
                    Analyse technique montrant des signaux de strength
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full mt-1.5 flex-shrink-0" />
                    Fondamentaux solides avec perspective de croissance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#EAB308] rounded-full mt-1.5 flex-shrink-0" />
                    Marché volatile nécessitant une gestion du risque
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0]">
                <p className="text-xs text-[#64748B]">
                  <strong>Avertissement:</strong> Cette analyse est générée automatiquement par notre IA et ne constitue pas un conseil financier. Consultez un professionnel avant toute décision d'investissement.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
